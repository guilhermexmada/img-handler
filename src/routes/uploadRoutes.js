import express from 'express'
import uploadController from '../controllers/uploadController.js'
import upload from '../middlewares/uploadMiddleware.js'
import uploadLimiter from '../middlewares/uploadRateLimiter.js'

const router = express.Router()

router.post('/', uploadLimiter, upload.single('image'), uploadController.uploadImage)

router.get('/', uploadController.getAllImages)

router.get('/:id', uploadController.getOneImage) 

export default router