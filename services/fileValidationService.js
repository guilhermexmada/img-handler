import { fileTypeFromFile } from "file-type"
import fs from 'fs/promises' 

const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png'
]

export async function validateImage(filePath){

    const type = await fileTypeFromFile(filePath)
    
    if (!type || !allowedTypes.includes(type.mime)){
        await fs.unlink(filePath) 
        throw new Error('Arquivo inválido ou tipo não permitido')
    }

    return type
}