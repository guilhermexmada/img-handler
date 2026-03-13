import app from './app.js'
import sequelize from './src/config/database.js'
import { initDatabase } from './src/database/init.js'
import { initStorage } from './src/utils/storage.js'


const PORT = process.env.PORT || 8080

async function startServer() { 
  try {
    await initDatabase()

    await initStorage()

    const server = app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    })

    server.on('error', (err) => {
      console.error(`Erro ao iniciar o servidor: ${err}`)
      process.exit(1)
    })

    server.on('uncaughtException', (err) => {
      console.error(`Uncaught exception: ${err}`)
      process.exit(1)
    })

    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled Rejection:', reason);
      process.exit(1);
    });

    process.on('SIGTERM', async () => {
      console.log('🛑 Encerrando servidor...');

      await sequelize.close() 

      server.close(() => {
        console.log('✅ Servidor encerrado corretamente');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Falha ao iniciar a aplicação:', error)
    process.exit(1)
  }
}

startServer()

