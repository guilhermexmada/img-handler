import { Sequelize } from 'sequelize'

export async function createDatabaseIfNotExists() {

    if (!process.env.DB_HOST || !process.env.DB_NAME) {
        throw new Error('Variáveis de ambiente do banco de dados não foram definidas.')
    }

    const sequelize = new Sequelize(
        '', 
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

    try {
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`)
        console.log('Banco foi criado com sucesso.')
    } catch (error) {
        console.error('Erro ao criar o banco: ', error)
        throw error
    } finally{
        await sequelize.close() 
    }

}