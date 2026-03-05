import HealthService from '../services/healthService.js'

// simula request/response
const healthCheck = async (req, res) => {
    try {
        const data = await HealthService.healthData()
        res.status(200).json({ message: "OK", data: data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro interno do servidor." })
    }

}

export default { healthCheck }