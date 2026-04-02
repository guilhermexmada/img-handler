import uploadService from "../services/uploadService.js"
import path from 'path'
class viewController{
    async renderHome(req, res, next){
        // faz requisição para buscar todas as imagens
        const images = await uploadService.getAll()

        let imgPaths = []

        images.forEach(image => {
            let filePath = image.image.file_path // captura caminho original do banco
            let webPath = filePath.replace(/\\/g, '/'); // ajusta padrão de barras
            imgPaths.push(webPath) // adiciona a um array
        })

        res.render('pages/home',{
            title: 'Home', 
            images: imgPaths // envia array com caminhos das imagens para homepage
        })
    }
}   

export default new viewController