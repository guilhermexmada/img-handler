import { sortObject, genOperationsHash } from "../src/utils/hash.js"

async function runTest() {
    const object = { a:1, b:2, c:{1:'a', 3:'c', 2:'b'}}

    const objectKeys = Object.keys(object)

    const randomKeys = objectKeys.sort(() => Math.random() - 0.5)

    const anotherObject = {}

    randomKeys.forEach(key => {
        anotherObject[key] = object[key]
    })

    console.log(object)
    console.log(anotherObject)

    const norm1 = sortObject(object)
    const norm2 = sortObject(anotherObject)
    console.log(norm1)
    console.log(norm2)

    const hash1 = genOperationsHash(object)
    const hash2 = genOperationsHash(anotherObject)
    console.log(hash1)
    console.log(hash2)
}

runTest()