import { fileTypeFromFile } from "file-type"
import fs from 'fs/promises' // manipular arquivos

// tipos MIME permitidos
const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png'
]

// exporta única função
export async function validateImage(filePath){
    // extrai tipo MIME do arquivo já salvo
    const type = await fileTypeFromFile(filePath)
    
    // se não existir ou não estiver entre os permitidos
    if (!type || !allowedTypes.includes(type.mime)){
        await fs.unlink(filePath) // remove arquivo
        throw new Error('Arquivo inválido ou tipo não permitido')
    }

    return type
}