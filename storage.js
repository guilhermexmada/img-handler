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

// verifica se um arquivo existe na storage (pasta uploads/) recebendo caminho do arquivo direto do banco
async function fileExists(path) {
    try {
        await fs.promises.access(path) // fixed : para usar métodos de promise do 'fs' precisa puxar de 'fs.promises'
        return true
    } catch {
        return false
    }
}

export { initStorage, fileExists }