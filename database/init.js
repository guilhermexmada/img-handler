import sequelize from '../config/database.js'
import { createDatabaseIfNotExists } from './createDatabase.js'
import '../models/index.js'

// inicializador do banco
export async function initDatabase() {
    try {
        await createDatabaseIfNotExists() // garante que o banco existe

        await sequelize.authenticate() // testa conexão
        console.log('Banco de dados conectado.')

        await sequelize.sync() // traduz models para SQL e as cria se não existirem
        console.log('Models sincronizadas.')

    } catch (error) {
        console.error('Erro ao iniciar o banco:', error)
        process.exit(1) // fecha aplicação indicando erro
    }
}