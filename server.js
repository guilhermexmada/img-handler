import app from './index.js'
import sequelize from './config/database.js'
import { initDatabase } from './database/init.js'
import { initStorage } from './storage.js'


const PORT = process.env.PORT || 8080

// bootstrap = processo que inicializa aplicação
async function startServer() { 
  try {
    // inicializa banco
    await initDatabase()

    // inicializa pasta uploads
    await initStorage()

    // inicializa servidor
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

      await sequelize.close() // fecha conexão com banco

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

// executando inicialização
startServer()

