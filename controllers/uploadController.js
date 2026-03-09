import { validateImage } from '../services/fileValidationService.js'
import uploadService from '../services/uploadService.js'

class UploadController{
    async uploadImage(req, res, next){
        try{
            const result = await uploadService.processUpload(req.file) // chama o serviço de upload com arquivo no parâmetro

            // extrai e valida o tipo MIME
            const filePath = req.file.path
            await validateImage(filePath)

            res.status(200).json(result) // exibe dados do arquivo
            // console.log([req.file,result])
        } catch (error){
            next(error) // trata erro com errorMiddleware
        }
    }
}

export default new UploadController