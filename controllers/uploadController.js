import { validateImage } from '../services/fileValidationService.js'
import uploadService from '../services/uploadService.js'
import path from 'path'
import validator from 'validator'

class UploadController{
    async uploadImage(req, res, next){
        try{
            const file = req.file
            const extension = path.extname(file.originalname).slice(1)

            const file_path = file.path
            await validateImage(file_path)

            const result = await uploadService.processUpload({
                file_path : file_path,
                mime_type : req.file.mimetype,
                size: file.size,
                original_name : file.originalname,
                extension: extension
            })

            res.status(200).json(result)
        } catch (error){
            next(error)
        }
    }
    async getAllImages(req, res, next){
        try {
            const result = await uploadService.getAll()
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async getOneImage(req, res, next){
        try {
            const id = req.params.id

            if(validator.isUUID(id)){
                const result = await uploadService.getOne(id)
                res.status(200).json(result)
            } else{
                res.status(400).json({error: 'Ocorreu um erro na validação da ID'})
            }

        } catch (error) {
            next(error)
        }
    }
}

export default new UploadController