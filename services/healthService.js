class HealthService {
  async healthData() {
    return {
      api: "running",
      service: "healthService",
      uptime: process.uptime(),
      timestamp: new Date()
    };  
  }
}

export default new HealthService()