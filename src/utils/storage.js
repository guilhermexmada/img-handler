import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

async function initStorage() {

    const __filepath = fileURLToPath(import.meta.url)

    const __dirpath = path.dirname(__filepath)

    const uploadDir = path.resolve(__dirpath, '..', '..', 'storage', 'uploads')
    const processedDir = path.resolve(__dirpath, '..', '..', 'storage', 'processed')

    try {
        if (!fs.existsSync(uploadDir)) {
            await fs.promises.mkdir(uploadDir, { recursive: true })
        }
        if (!fs.existsSync(processedDir)) {
            await fs.promises.mkdir(processedDir, { recursive: true })
        }
        console.log('Pasta storage criada.')
    } catch (error) {
        console.error('Erro ao criar pasta storage: ', error)
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

async function getUniquePath(outputPath) {
    const parsedPath = path.parse(outputPath)
    let dir = parsedPath.dir
    let name = parsedPath.name
    let ext = parsedPath.ext
    let i = 1
    let finalPath = outputPath

    while (true) {
        try {
            await fs.promises.access(finalPath)
            finalPath = path.join(`${dir}/${name}(${i})${ext}`)
            i++
        } catch (error) {
            break
        }
    }
    return finalPath
}

async function deleteFile(path) {
    try {
        await fs.promises.access(path) // tenta acessar arquivo
        await fs.promises.unlink(path) // se acessou, tenta apagar arquivos
        console.log('Imagem excluída da storage com sucesso!')
    } catch (error){
        console.error('Não foi possível excluir a imagem da storage: ', error)
    }
}

export { initStorage, fileExists, getUniquePath, deleteFile }