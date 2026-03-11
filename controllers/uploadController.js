import { validateImage } from '../services/fileValidationService.js'
import uploadService from '../services/uploadService.js'
import path from 'path'

class UploadController{
    async uploadImage(req, res, next){
        try{
            const file = req.file
            const extension = path.extname(file.originalname).slice(1)

            // fix : deve validar mime-type antes de salvar no banco
            const file_path = file.path
            await validateImage(file_path)

            // envia dados da imagem para service salvar no banco
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
}

export default new UploadController