import { validateImage } from '../services/fileValidationService.js'
import uploadService from '../services/uploadService.js'

class UploadController{
    async uploadImage(req, res, next){
        try{
            const result = await uploadService.processUpload(req.file)

            const filePath = req.file.path
            await validateImage(filePath)

            res.status(200).json(result)
        } catch (error){
            next(error)
        }
    }
}

export default new UploadController