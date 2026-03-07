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

// tipos permitidos
const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
]

const fileFilter = (req, file, cb) => {
    if(allowedMimeTypes.includes(file.mimetype)){ // se algum dos tipos permitidos é o tipo do arquivo
        cb(null, true)
    } else {
        cb(new Error('Tipo de arquivo não permitido'), false)
    }
}

const upload = multer({ // cria middleware configurado
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // máx de 500mb
})

export default upload // exporta para usar nas rotas