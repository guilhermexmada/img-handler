import app from './index.js'

const PORT = process.env.PORT || 8080 // recebe porta do servidor ou roda local na 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

// tratamento de erros como EVENTOS ao invés de callback no app.listen()

server.on('error', (err) => {
    console.error(`Erro ao iniciar o servidor: ${err}`)
    process.exit(1) // finaliza aplicação indicando erro
})

server.on('uncaughtException', (err) => { // trata erros síncronos sem try/catch
    console.error(`Uncaught exception: ${err}`)
    process.exit(1)
})

process.on('unhandledRejection', (reason) => { // trata erros assíncronos sem catch
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

// encerra aplicação de forma controlada ao receber um sinal do sistema operacional -> graceful shutdown
process.on('SIGTERM', () => { 
  console.log('🛑 Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado corretamente');
    process.exit(0); // finaliza aplicação sem indicar erro
  });
});