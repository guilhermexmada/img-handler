import fs from 'fs'
import path from 'path'

export async function initStorage() {
    const uploadDir = path.resolve('uploads')
    try {
        if (!fs.existsSync(uploadDir)) {
            await fs.promises.mkdir(uploadDir,
                { recursive: true } 
            )

            console.log('Pasta uploads criada.')
        }
    } catch (error) {
        console.error('Erro ao criar pasta uploads: ', error)
        throw error
    }
}