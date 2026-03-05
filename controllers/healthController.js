import HealthService from '../services/healthService.js'

// simula request/response
const healthCheck = async (req, res, next) => {
    try {
        const data = await HealthService.healthData()
        res.status(200).json({ message: "OK", data: data })
    } catch (error) {
        next(error) // pula outros middlewares e chama o errorMiddleware (identificado por 4 parâmetros)
    }

}

export default { healthCheck }