import { sharPipeline } from "../pipelines/sharpPipeline.js"
import { getUniquePath } from "../utils/storage.js"
import path from 'path'

class ProcessService{
    async processImage(filePath, operations){
        try {
            // cria caminho absoluto da imagem baixada
            const inputPath = path.resolve(filePath)
            console.log(inputPath)
            // define nome da imagem processada ( )

            // cria caminho de saída da imagem processada
            const outputPath = await getUniquePath()

        } catch (error) {
            console.log(error)
        }
    }
}