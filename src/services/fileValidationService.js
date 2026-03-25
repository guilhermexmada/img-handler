import { fileTypeFromFile } from "file-type"
import fs from 'fs/promises' 
import AppError from "../utils/appError.js"

const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png'
]

export async function validateImage(filePath){

    const type = await fileTypeFromFile(filePath)
    
    if (!type || !allowedTypes.includes(type.mime)){
        await fs.unlink(filePath)
        throw new AppError('Arquivo inválido ou tipo não permitido', 400) // tipo mime da imagem inválido
    }

    return type
}