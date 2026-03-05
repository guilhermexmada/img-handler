import express from 'express'
import healthController from "../controllers/healthController.js";

const healthRoutes = express.Router()

healthRoutes.get('/health', healthController.healthCheck) // rota de teste

export default healthRoutes