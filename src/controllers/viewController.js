import uploadService from "../services/uploadService.js"
import path from 'path'
class viewController{
    async renderHome(req, res, next){
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

        res.render('pages/home',{
            title: 'Home', 
            images: formattedImages
        })
    }
}   

export default new viewController