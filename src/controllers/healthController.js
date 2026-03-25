import HealthService from '../services/healthService.js'
import AppError from '../utils/appError.js'

const healthCheck = async (req, res, next) => {
    try {
        const data = await HealthService.healthData()

        // se a service não retornar dados
        if(!data){
            throw new AppError('Serviço indisponível', 503)
        }   

        res.status(200).json({ message: "Serviço disponível", data: data })
    } catch (error) {
        next(error)
    }

}

export default { healthCheck }