import { genImageHash } from "../src/utils/hash.js";
import path from 'path'

async function runTest(){
    const fileName = 'test.png' // nome da imagem

    const filePath = path.resolve(`./storage/uploads/${fileName}`) // caminho completo da imagem

    // console.log(filePath)

    const result = await genImageHash(filePath) // chama função de hash
    console.log(result) // exibe hash
}

runTest()