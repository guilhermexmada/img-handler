import { validateImage } from '../services/fileValidationService.js'
import uploadService from '../services/uploadService.js'
import path from 'path'
import validator from 'validator'
import AppError from '../utils/appError.js'

class UploadController{
    async uploadImage(req, res, next){
        try{
            const file = req.file

            if(!file){
                throw new AppError('Arquivo não enviado', 404) // imagem não chegou no controller
            }

            const extension = path.extname(file.originalname).slice(1)

            const file_path = file.path
            await validateImage(file_path)

            const result = await uploadService.processUpload({
                file_path : file_path,
                mime_type : file.mimetype,
                size: file.size,
                original_name : file.originalname,
                extension: extension
            })

            res.status(201).json({success: true, message: 'Imagem salva com sucesso', result})
        } catch (error){
            next(error)
        }
    }
    async getAllImages(req, res, next){
        try {
            const result = await uploadService.getAll()
            res.status(200).json({success: true, message: 'Imagens encontradas com sucesso', result})
        } catch (error) {
            next(error)
        }
    }
    async getOneImage(req, res, next){
        try {
            const id = req.params.id

            if(!id){
                throw new AppError('ID da imagem não encontrada', 400) // ID não foi passado para controller
            }

            if(validator.isUUID(id)){
                const result = await uploadService.getOne(id)
                res.status(200).json({success: true, message: 'Imagem encontrada com sucesso', result})
            } else{
                throw new AppError('ID da imagem inválida', 400) // não está no formato UUID
            }

        } catch (error) {
            next(error)
        }
    }
}

export default new UploadController