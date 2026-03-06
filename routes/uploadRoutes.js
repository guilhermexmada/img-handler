import express from 'express'
import uploadController from '../controllers/uploadController.js'
import upload from '../middlewares/uploadMiddleware.js'

const router = express.Router()

// campo do formulário deve ser 'image'
router.post('/', upload.single('image'), uploadController.uploadImage)

export default router