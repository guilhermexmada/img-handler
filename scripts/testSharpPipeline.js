import { sharpPipeline } from "../src/pipelines/sharpPipeline.js"
import { getUniquePath } from "../src/utils/storage.js"
import path from 'path'
import fs from 'fs'

async function runTest() {

    const fileName = 'test.png'

    const inputPath = path.resolve(`./storage/uploads/${fileName}`)

    const firstOutputPath = path.resolve('./storage/processed/test-output.png')

    const outputPath = await getUniquePath(firstOutputPath)

    const operations = {
        resize: { width: 100, heigth: 100},
        rotate: 90,
        crop: { width: 25, height: 25, top: 0, left: 0},
        compress: { quality: 1},
        format: 'png'
    }
    
    try {
        const result = await sharpPipeline(inputPath, outputPath, operations)

        console.log('Pipeline executada com sucesso! \nOutput: ', result)
    } catch (error) {
        console.error('Erro em sharPipeline: ', error)
    }
}

runTest()