import processService from "../services/processService.js"
import uploadService from "../services/uploadService.js"
import path from 'path'
import AppError from "../utils/appError.js"

class ProcessController {
    async processImage(req, res, next){
        try {
            // captura id da imagem original e operações para aplicar nela
            const originalId = req.body.id
            const operations = req.body.operations
            
            if(!originalId || !operations){
                throw new AppError('Campos obrigatórios não preenchidos', 400) // id ou operações não foram passados para controller
            }

            // procura imagem original no banco e captura caminho
            const originalImage = await uploadService.getOne(originalId)

            // se a imagem original existe, executa a pipeline
            if(originalImage.exists_in_storage === true){
                // captura caminho e nome dela
                const originalImageData = originalImage.saved_image
                const filePath = originalImageData.file_path
                const parsedPath = path.parse(filePath)
                const fileName = parsedPath.name
                // console.log('dados extraidos')
                const result = await processService.sendToPipeline(fileName, filePath, operations)
                res.status(200).json({success: true, message: 'Imagem processada com sucesso', result})
            } else {
                throw new AppError('Imagem original não encontrada', 404) // imagem não existe na storage
            }

        } catch (error) {
            next(error)
        }
    }
}

export default new ProcessController()