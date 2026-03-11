import { Sequelize } from 'sequelize'

// verifica se as variáveis de ambiente foram definidas
if(!process.env.DB_HOST || !process.env.DB_NAME){
    throw new Error('Variáveis de ambiente do banco de dados não foram definidas.')
}

const sequelize = new Sequelize(
    // autentica-se no banco com variáveis de ambiente
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: true, // liga/desliga logs de queries no console
        timezone: '-03:00',
        pool:{ // define quantidade de conexões simultâneas permitidas com o banco
            max: 10,
            min: 0, // conforme o necessário
            acquire: 30000, // tempo de espera para obter uma conexão
            idle: 10000 // tempo de espera para uma conexão ficar inativa
        }
    }
)

export default sequelize