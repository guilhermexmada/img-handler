import { Sequelize } from 'sequelize' // não importa de config/database.js pq em caso de ausência do banco há falha

export async function createDatabaseIfNotExists() {

    // verifica variáveis de ambiente +1 vez
    if (!process.env.DB_HOST || !process.env.DB_NAME) {
        throw new Error('Variáveis de ambiente do banco de dados não foram definidas.')
    }

    // configura nova conexão
    const sequelize = new Sequelize(
        '', // sem nome do bd pois ainda não foi criado
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'mysql',
            logging: true,
            timezone: '-03:00',
            pool: {
                max: 10,
                min: 0, 
                acquire: 30000, 
                idle: 10000 
            }
        }
    )

    // tenta criar banco
    try {
        // barras invertidas -> literal strings do JS + delimtiador do DB_NAME do SQL
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`)
        console.log('Banco foi criado com sucesso.')
    } catch (error) {
        console.error('Erro ao criar o banco: ', error)
        throw error
    } finally{
        await sequelize.close() // fecha conexão, independente do resultado
    }

}