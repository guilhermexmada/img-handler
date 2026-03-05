import app from './index.js'

const PORT = process.env.PORT || 8080

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

process.on('SIGTERM', () => { 
  console.log('🛑 Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado corretamente');
    process.exit(0);
  });
});