import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

if(!process.env.DB_HOST || !process.env.DB_NAME){
    throw new Error('Variáveis de ambiente do banco de dados não foram definidas.')
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: true, 
        timezone: '-03:00',
        pool:{ 
            max: 10,
            min: 0, 
            acquire: 30000, 
            idle: 10000 
        }
    }
)

export default sequelize