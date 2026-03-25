// criando classe para tratar erros diferentes
class AppError extends Error { // herda da classe nativa Error do Node
    // construtor chamado quando uma nova instância de AppError é criada
    constructor(message, statusCode = 500) {
        super(message) // chama o construtor da classe Error -> define mensagem e cria stack trace
        // define código HTTP
        this.statusCode = statusCode
        // flag -> indica que o erro é 'esperado' ou 'controlado'
        this.isOperational = true
    }
}

export default AppError // exporta classe para molde de erros personalizados