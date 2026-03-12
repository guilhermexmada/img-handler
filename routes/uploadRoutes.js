import express from 'express'
import uploadController from '../controllers/uploadController.js'
import upload from '../middlewares/uploadMiddleware.js'
import uploadLimiter from '../middlewares/uploadRateLimiter.js'

const router = express.Router()

router.post('/', uploadLimiter, upload.single('image'), uploadController.uploadImage)

// endpoint para retornar todas as imagens
router.get('/', uploadController.getAllImages)

export default router