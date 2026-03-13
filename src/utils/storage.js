import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url' // pacote nativo para manipular URLs (diferente de path, usado para caminhos do sistema)

async function initStorage() {
    // obtém o caminho do arquivo atual (storage.js)
    const __filepath = fileURLToPath(import.meta.url) // import.meta.url localiza storage.js por URL

    // obtém o caminho do diretório pai
    const __dirpath = path.dirname(__filepath)
    
    // define o caminho absoluto para 'storage/uploads' na raiz do repositório
    const uploadDir = path.resolve(__dirpath, '..', '..', 'storage', 'uploads') // separar diretórios como argumentos automatiza formatação do caminho de acordo com o SO (uso de \ ou /)
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