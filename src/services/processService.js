import { PreProcess, Upload } from '../models/index.js'
import { sharpPipeline } from "../pipelines/sharpPipeline.js"
import { fileExists, getUniquePath } from "../utils/storage.js"
import path from 'path'
import { fileURLToPath } from 'url'
import AppError from '../utils/appError.js'

class ProcessService {
    async sendToPipeline(fileName, filePath, operations) {
        try {
            const inputPath = path.resolve(filePath)

            const thisFile = fileURLToPath(import.meta.url)
            const __dirpath = path.dirname(thisFile)
            const firstOutputPath = path.resolve(__dirpath, '..', '..', 'storage', 'processed', `${fileName}-output.png`)
            const outputPath = await getUniquePath(firstOutputPath)

            const result = await sharpPipeline(inputPath, outputPath, operations)
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async saveProcessedImage(data) {
        if (!data) {
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
    async getDuplicate(imageHash, operationsHash) {
        try {
            const duplicate = await PreProcess.findOne({
                where: {
                    operations_hash: operationsHash
                },
                include: {
                    model: Upload,
                    as: 'upload',
                    where: {
                        image_hash: imageHash
                    },
                    required: true
                }
            })
            if (duplicate === null) {
                return { result: false }
            } else {
                return {
                    result: true,
                    duplicateImage: duplicate
                }
            }
        } catch (error) {
            throw new AppError('Não foi possível verificar a duplicidade da operação', 500)
        }
    }
    async getProcessedVersions(id) {
        try {
            const processedImages = await PreProcess.findAll({
                where: {
                    original_image_id: id,
                },
                order: [['createdAt', 'DESC']],
                raw: true
            })

            const result = await Promise.all(
                processedImages.map(async (image) => {
                    const exists = await fileExists(image.file_path)
                    return {
                        image,
                        exists_in_storage: exists
                    }
                })
            )
            return result
        } catch (error) {
            console.log(error)
        }
    }
}

export default new ProcessService()