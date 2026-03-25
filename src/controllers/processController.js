import processService from "../services/processService.js"
import uploadService from "../services/uploadService.js"
import path from 'path'

class ProcessController {
    async processImage(req, res, next){
        try {
            // console.log('chegou no controller')
            
            // captura id da imagem original e operações para aplicar nela
            const originalImageId = req.body.id
            const operations = req.body.operations
            // console.log(req.body.id)

            // procura imagem original no banco e captura caminho
            const originalImage = await uploadService.getOne(originalImageId)
            //  console.log(originalImage)

            // se a imagem original existe, executa a pipeline
            if(originalImage.result.exists_in_storage === true){
                // console.log('imagem existe')
                // captura caminho e nome dela
                const originalImageData = originalImage.result.saved_image.dataValues
                const filePath = originalImageData.file_path
                const parsedPath = path.parse(filePath)
                const fileName = parsedPath.name
                // console.log('dados extraidos')
                const result = await processService.sendToPipeline(fileName, filePath, operations)
                res.status(200).json({message: 'Imagem processada com sucesso!', result})
            } else {
                res.status(404).json({error : 'Imagem original não encontrada.'})
            }

        } catch (error) {
            next(error)
        }
    }
}

export default new ProcessController()