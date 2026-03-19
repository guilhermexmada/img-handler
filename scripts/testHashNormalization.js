import { sortObject } from "../src/utils/hash.js"

async function runTest() {
    // objetos aninhados para teste
    const object = {
        c : 'valor',
        b : 'valor',
        a : {
            b : 'valor',
            a : 'valor',
            1 : {
                2 : 'valor',
                1 : 'valor',
            }
        }
    }

    // captura resultado e exibe no terminal
    const result = sortObject(object)
    console.log(result)
}

runTest()