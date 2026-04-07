import express from "express"
import viewController from "../controllers/viewController.js"

const router = express.Router()

router.get('/', viewController.renderHome)

router.get('/:id', viewController.renderImagePage)

export default router