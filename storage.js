import fs from 'fs'
import path from 'path'

async function initStorage() {
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

async function fileExists(path) {
    try {
        await fs.promises.access(path)
        return true
    } catch {
        return false
    }
}

export { initStorage, fileExists }