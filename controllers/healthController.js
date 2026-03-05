import HealthService from '../services/healthService.js'

const healthCheck = async (req, res, next) => {
    try {
        const data = await HealthService.healthData()
        res.status(200).json({ message: "OK", data: data })
    } catch (error) {
        next(error)
    }

}

export default { healthCheck }