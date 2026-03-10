import multer from 'multer' 
import path from 'path' 
import { v4 as uuidv4 } from 'uuid' 

const storage = multer.diskStorage({ 
    
    destination: (req, file, cb) => {
        cb(null, 'uploads/') 
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
        cb(new Error('Tipo de arquivo não permitido'), false)
    }
}

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
})

export default upload 