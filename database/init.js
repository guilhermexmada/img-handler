import sequelize from '../config/database.js'
import { createDatabaseIfNotExists } from './createDatabase.js'
import '../models/index.js'

export async function initDatabase() {
    try {
        await createDatabaseIfNotExists()

        await sequelize.authenticate()
        console.log('Banco de dados conectado.')

        await sequelize.sync() 
        console.log('Models sincronizadas.')

    } catch (error) {
        console.error('Erro ao iniciar o banco:', error)
        process.exit(1) 
    }
}