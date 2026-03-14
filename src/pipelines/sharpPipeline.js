import sharp from 'sharp'

/* 
    inputPath = caminho da imagem original
    outputPath = caminho para salvar imagem resultante
    operations = objeto contendo as transformações
*/
export async function sharPipeline(inputPath, outputPath, operations = {}) {
    // cria pipeline lazy (operações são executadas apenas quando uma função de saída é chamada)
    let pipeline = sharp(inputPath)

    if (operations.resize) { // se existe a operação X no objeto operations passado como parâmetro
        const width = operations.resize.width
        const height = operations.resize.height
        pipeline = pipeline.resize(width, height) // sempre altera a própria imagem na variável pipeline e passa para próxima operação
    }

    if (operations.rotate) {
        const degrees = operations.rotate
        pipeline = pipeline.rotate(degrees)
    }

    if (operations.crop) {
        const dimensions = operations.crop
        pipeline = pipeline.extract(dimensions) // fix : crop() para extract()
    }

    if (operations.format) {
        const format = operations.format
        pipeline = pipeline.toFormat(format) // fix : format() para toFormat()
    } else {
        const format = 'png'
    }

    if (operations.compress) {
        const quality = operations.compress
        if (format === 'jpeg') {
            pipeline = pipeline.jpeg({ quality })
        }
        else if (format === 'png') {
            pipeline = pipeline.png({ quality })
        }
        else if (format === 'webp') {
            pipeline = pipeline.webp({ quality })
        }
        else {
            pipeline = pipeline.png({ quality })
        }
    }

    await pipeline.toFile(outputPath) // gera arquivo no caminho de destino
    return outputPath // retorna os dados da imagem processada

}