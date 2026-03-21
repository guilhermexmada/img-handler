import { genImageHash } from "../src/utils/hash.js";
import path from 'path'

async function runTest(){
    const fileName = 'test.png'

    const filePath = path.resolve(`./storage/uploads/${fileName}`)

    const result = await genImageHash(filePath)
    console.log(result)
}

runTest()