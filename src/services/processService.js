import { PreProcess, Upload } from '../models/index.js'
import { sharpPipeline } from "../pipelines/sharpPipeline.js"
import { getUniquePath } from "../utils/storage.js"
import path from 'path'
import { fileURLToPath } from 'url' 
import AppError from '../utils/appError.js'

class ProcessService{
    async sendToPipeline(fileName, filePath, operations){
        try {
            // cria caminho absoluto da imagem original
            const inputPath = path.resolve(filePath)

            // cria caminho de saída para guardar imagem processada
            const thisFile = fileURLToPath(import.meta.url) 
            const __dirpath = path.dirname(thisFile)
            const firstOutputPath = path.resolve(__dirpath, '..', '..', 'storage', 'processed', `${fileName}-output.png`)
            const outputPath = await getUniquePath(firstOutputPath)

            // executa pipeline
            const result = await sharpPipeline(inputPath, outputPath, operations)

            // retorna caminho da imagem processada
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async saveProcessedImage(data){
        if(!data){
            throw new AppError('Erro ao baixar imagem processada', 500)
        }
        try {
            const newImage = await PreProcess.create(data)
            return newImage
        } catch (error) {
            console.log(error)
            throw new AppError('Erro ao salvar imagem processada', 500)
        }
    }
    async getDuplicate(imageHash, operationsHash){
        // procura uma imagem processada da mesma origem e com as mesmas operações
        try {
            // INNER JOIN em sequelize
            const duplicate = await PreProcess.findOne({
                where:{
                    operations_hash: operationsHash
                },
                include:{
                    model: Upload,
                    as: 'upload',
                    where:{
                        image_hash: imageHash
                    },
                    required: true
                }
            })
            if(duplicate === null){
                return {result: false}
            } else {
                return {
                    result: true,
                    duplicateImage: duplicate // se achar uma imagem processada igual, retorna ela
                }
            }
        } catch (error) {
            throw new AppError('Não foi possível verificar a duplicidade da operação', 500)
        }
    }
}

export default new ProcessService()