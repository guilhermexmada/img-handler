import crypto from 'crypto' // nativo do node
import fs from 'fs'
import Stream from 'stream'

/*
    hash -> função que transforma dados em sequência de caracteres de comprimento fixo de modo determinístico e irreversível
    por que? guardar hash das operações aplicadas permite evitar fazer as mesmas operações na mesma imagem
    problema de hashear JSON -> o mesmo JSON com a ordem das chaves diferente resulta num hash diferente, quebrando a comparação
    como resolver? ordenar alfabeticamente as chaves do JSON antes de hashear (normalizar)
    e para objetos aninhados? usar recursão
*/

// função recursiva para ordenar chaves do JSON, garantindo integridade do hash (normalização)
function sortObject(obj){
    // se for diferente de objeto, nulo ou array -> não precisa ordenar, apenas devolve valor para seu lugar
    if(typeof obj !== 'object' || obj == null || Array.isArray(obj)){
        return obj
    }

    // se for objeto, ordena suas chaves alfabeticamente
    const keys = Object.keys(obj)
    const orderedKeys = keys.sort()

    const newObj = {} // inicia objeto vazio para ordenar objetos aninhados

    // para cada chave, chama novamente a função (recursão) criando um novo objeto que substitui o aninhado
    orderedKeys.forEach(key => {
        newObj[key] = sortObject(obj[key])
    })

    return newObj
}

// gera hash das operações aplicadas nas imagens
function genOperationsHash(operations){
    // ordena JSON das operações
    const sorted = sortObject(operations)
    // transforma todo o JSON em string
    const stringfied = JSON.stringify(sorted)
    // gera hash
    return crypto.createHash('sha256').update(stringfied).digest('hex')
}

// gera hash baseado no conteúdo (bits) da imagem
async function genImageHash(filePath){
    try {
        /*
            stream -> interface para acessar dados de forma incremental (chunks) ao invés de carregar arquivo inteiro na RAM
            pipeline() é uma função que conecta as streams tratando erros automaticamente sem sobrecarregar a memória
        */
       const hash = crypto.createHash('sha256')
       const stream = fs.createReadStream(filePath) // cria readable stream (fluxo de leitura) do arquivo, divide-o em pequenos pedaços (chunks)
       // pipeline alimenta a função de hash com as chunks progressivamente
       await Stream.promises.pipeline(stream, hash)
       return hash.digest('hex') // depois de finalizado o hash, converte para hexadecimal
    } catch (error) {
        console.log(error)
    }
}

export { sortObject, genOperationsHash, genImageHash }


