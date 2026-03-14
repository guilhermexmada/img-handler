import { sharPipeline } from "../src/pipelines/sharpPipeline.js"
import path from 'path'
import fs from 'fs'

// função de teste executada com 'node nome-do-arquivo'
async function runTest() {

    const fileName = 'f43f3fa4-8639-4c9e-99fd-0ccae89004f2.jpg' // troque 'test.png' pelo nome do arquivo de teste

    // definindo caminho da imagem original
    const inputPath = path.resolve(`./storage/uploads/${fileName}`)

    // definindo caminho para salvar imagem resultante
    const firstOutputPath = path.resolve('./storage/test-output.png')

    // se o caminho já existe, obtém um novo caminho de saída
    const outputPath = await getUniquePath(firstOutputPath)

    // define operações da pipeline
    const operations = {
        resize: { width: 50, heigth: 50},
        rotate: 90,
        format: 'png'
    }

    // tenta executar pipeline
    try {
        const result = await sharPipeline(inputPath, outputPath, operations)

        console.log('Pipeline executada com sucesso! \nOutput: ', result)
    } catch (error) {
        console.error('Erro em sharPipeline: ', error)
    }
}

async function getUniquePath(outputPath){
    // quebra caminho de saída em objeto com partes fundamentais
    const parsedPath = path.parse(outputPath)
    let dir = parsedPath.dir
    let name = parsedPath.name
    let ext = parsedPath.ext
    // contador que é atribuído ao novo nome do arquivo
    let i = 1 
    // novo caminho de saída usando nome de arquivo único (começa com o caminho original e vai sendo incrementado por i)
    let finalPath = outputPath

    // loop que dura até encontrar um nome de arquivo único
    while (true){
        try {
            console.log(dir)
            await fs.promises.access(finalPath) // tenta acessar o caminho de saída atual
            finalPath = path.join(`${dir}/${name}(${i})${ext}`) // se conseguir, cria um novo caminho de saída
            i++ // incrementa contador para tentar novamente
        } catch (error) {
            break // se não conseguir acessar o caminho, ele não existe, então pode ser usado
        }
    }
    return finalPath
}

runTest()