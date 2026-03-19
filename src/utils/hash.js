import crypto from 'crypto' // nativo do node

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

export { sortObject }


