import { title } from "process"
import uploadService from "../services/uploadService.js"
import processService from "../services/processService.js"
import path from 'path'
import validator from 'validator'
import AppError from '../utils/appError.js'
import upload from "../middlewares/uploadMiddleware.js"

class viewController {
    async renderHome(req, res, next) {
        // faz requisição para buscar todas as imagens
        const images = await uploadService.getAll()

        // usa .map para escrever um novo objeto para cada item do objeto retornado na consulta
        const formattedImages = images.map(item => {
            const filePath = item.image.file_path
            const webPath = filePath.replace(/\\/g, '/') // formata caminho corretamente (troca \ por /)
            return {
                id: item.image.id,
                path: webPath
            }
        })

        res.render('pages/home', {
            title: 'Home',
            images: formattedImages
        })
    }
    async renderImagePage(req, res, next) {
        try {
            const id = req.params.id

            if (!id) {
                throw new AppError('ID da imagem não encontrada', 400)
            }

            if (validator.isUUID(id)) {
                let uploadedImage = await uploadService.getOne(id)
                const uploadedFilePath = uploadedImage.saved_image.file_path
                const uploadedWebPath = uploadedFilePath.replace(/\\/g, '/')
                uploadedImage = {
                    id: uploadedImage.saved_image.id,
                    path: uploadedWebPath
                } 
                const processedImages = await processService.getProcessedVersions(id)
                const formattedImages = processedImages.map(item => {
                    const filePath = item.image.file_path
                    const webPath = filePath.replace(/\\/g, '/') // formata caminho corretamente (troca \ por /)
                    return {
                        id: item.image.id,
                        path: webPath
                    }
                })
                res.render('pages/image', {
                    title: 'Imagem',
                    uploadedImage: uploadedImage,
                    images: formattedImages
                })
            } else {
                throw new AppError('ID da imagem inválida', 400)
            }
        } catch (error) {
            next(error)
        }

    }
}

export default new viewController