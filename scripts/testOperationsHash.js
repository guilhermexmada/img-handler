import { sortObject, genOperationsHash } from "../src/utils/hash.js"

async function runTest() {
    // objetos aninhados para teste
    const object = { a:1, b:2, c:{1:'a', 3:'c', 2:'b'}}

    const objectKeys = Object.keys(object) // extrai chaves

    const randomKeys = objectKeys.sort(() => Math.random() - 0.5) // embaralha chaves

    const anotherObject = {}

    // cria um novo objeto seguindo as chaves embaralhadas
    randomKeys.forEach(key => {
        anotherObject[key] = object[key]
    })

    // exibindo objetos
    console.log(object)
    console.log(anotherObject)

    // captura resultado da normalização e exibe no terminal
    const norm1 = sortObject(object)
    const norm2 = sortObject(anotherObject)
    console.log(norm1)
    console.log(norm2)

    // captura resultado dos hashes e exibe no terminal
    const hash1 = genOperationsHash(object)
    const hash2 = genOperationsHash(anotherObject)
    console.log(hash1)
    console.log(hash2)
}

runTest()