// simula retorno de dados
class HealthService {
  async healthData() {
    // throw new Error('Teste do errorMiddleware')
    return {
      api: "running",
      service: "healthService",
      uptime: process.uptime(), // tempo de atividade do servidor em segundos
      timestamp: new Date()
    };  
  }
}

export default new HealthService()