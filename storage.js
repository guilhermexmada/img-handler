import fs from 'fs'
import path from 'path'

// função que inicializa diretório de armazenamento das imagens
export async function initStorage() {
    // cria um caminho absoluto p/ pasta uploads na raiz do repositório
    const uploadDir = path.resolve('uploads')
    try {
        // verifica se a pasta uploads não existe
        if (!fs.existsSync(uploadDir)) {
            // cria a pasta de forma assíncrona
            await fs.promises.mkdir(uploadDir,
                { recursive: true } // se necessário, cria pasta pai
            )

            console.log('Pasta uploads criada.')
        }
    } catch (error) {
        console.error('Erro ao criar pasta uploads: ', error)
        throw error
    }
}