import multer from 'multer' 
import path from 'path' 
import { v4 as uuidv4 } from 'uuid' 
import AppError from '../utils/appError.js'

const storage = multer.diskStorage({ 
    
    destination: (req, file, cb) => {
        cb(null, 'storage/uploads/') 
    },

    filename: (req, file, cb) => {
        
        const uniqueName = uuidv4()
        const extension = path.extname(file.originalname) 

        cb(null, uniqueName + extension)
    }
})

const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
]

const fileFilter = (req, file, cb) => {
    if(allowedMimeTypes.includes(file.mimetype)){ 
        cb(null, true)
    } else {
        cb(new AppError('Tipo de arquivo não permitido', 400), false) // formato inválido da imagem
    }
}

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
})

export default upload 