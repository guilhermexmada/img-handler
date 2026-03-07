import express from 'express'
import uploadController from '../controllers/uploadController.js'
import upload from '../middlewares/uploadMiddleware.js'
import uploadLimiter from '../middlewares/uploadRateLimiter.js'

const router = express.Router()

// campo do formulário deve ser 'image'
router.post('/', uploadLimiter, upload.single('image'), uploadController.uploadImage)

export default router