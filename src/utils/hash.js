import crypto from 'crypto'
import fs from 'fs'
import Stream from 'stream'


function sortObject(obj){
    if(typeof obj !== 'object' || obj == null || Array.isArray(obj)){
        return obj
    }
   
    const keys = Object.keys(obj)
    const orderedKeys = keys.sort()

    const newObj = {} 

    orderedKeys.forEach(key => {
        newObj[key] = sortObject(obj[key])
    })

    return newObj
}

function genOperationsHash(operations){
    
    const sorted = sortObject(operations)
    
    const stringfied = JSON.stringify(sorted)
    
    return crypto.createHash('sha256').update(stringfied).digest('hex')
}


async function genImageHash(filePath){
    try {
       const hash = crypto.createHash('sha256')
       const stream = fs.createReadStream(filePath)
       await Stream.promises.pipeline(stream, hash)
       return hash.digest('hex')
    } catch (error) {
        console.log(error)
    }
}

export { sortObject, genOperationsHash, genImageHash }


