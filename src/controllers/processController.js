import processService from "../services/processService.js"
import uploadService from "../services/uploadService.js"
import { genOperationsHash, genImageHash } from "../utils/hash.js"
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import AppError from "../utils/appError.js"

class ProcessController {
    async processImage(req, res, next){
        try {
            const originalId = req.body.id
            const operations = req.body.operations
            
            if(!originalId || !operations){
                throw new AppError('Campos obrigatórios não preenchidos', 400) 
            }

            const originalImageData = await uploadService.getOne(originalId)
            
            if(originalImageData.exists_in_storage === true){
                
                const originalImage = originalImageData.saved_image
                const originalPath = originalImage.file_path
                const parsedPath = path.parse(originalPath)
                const originalName = parsedPath.name
                const originalHash = originalImage.image_hash

                const operationsHash = await genOperationsHash(operations)

                const duplicate = await processService.getDuplicate(originalHash, operationsHash)
                if(duplicate.result === true){
                    const duplicateImage = duplicate.duplicateImage
                    return res.status(200).json({success: true, message: 'Esta imagem já sofreu as transformações solicitadas', duplicateImage})
                }

                const result = await processService.sendToPipeline(originalName, originalPath, operations)
                
                // extraindo caminho curto do caminho absoluto da imagem
                const resultParts = result.split(path.sep) // divide em partes com base no separador \ ou /
                const indexStorage = resultParts.indexOf('storage') 
                const shortPath = resultParts.slice(indexStorage).join(path.sep)
                console.log(shortPath)

                const stats = await fs.promises.stat(result)
                const metadata = await sharp(result).metadata()
                const processedImageName = path.parse(result).base

                const processedImage = await processService.saveProcessedImage({
                    original_image_id : originalId,
                    file_name: processedImageName,
                    file_path: shortPath,
                    format: metadata.format,
                    width: metadata.width,
                    height: metadata.height,
                    size: stats.size,
                    operations: operations,
                    operations_hash: operationsHash,
                    mode: 'display'
                })

                res.status(201).json({success: true, message: 'Imagem processada e salva com sucesso', result})
            } else {
                throw new AppError('Imagem original não encontrada', 404) 
            }

        } catch (error) {
            next(error)
        }
    }
}

export default new ProcessController()