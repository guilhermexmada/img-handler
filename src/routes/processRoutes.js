import express from 'express'
import processController from '../controllers/processController.js'

const router = express.Router()

router.post('/', processController.processImage)

export default router