import multer from 'multer' // middleware de upload que processa req do tipo form-data
import path from 'path' // módulo nativo do node p/ manipular caminhos e extensões de arquivos
import { v4 as uuidv4 } from 'uuid' // lib p/ identificador único

const storage = multer.diskStorage({ // salva arquivo no servidor (pasta uploads)
    
    // salva arquivo
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // callback (nenhum erro, pasta de destino)
    },

    // nomeia arquivo
    filename: (req, file, cb) => {
        
        const uniqueName = uuidv4()
        const extension = path.extname(file.originalname) // extrai a extensão do arquivo

        // retorna nome único
        cb(null, uniqueName + extension)
    }
})

const upload = multer({storage}) // cria middleware configurado

export default upload // exporta para usar nas rotas