import express from 'express'
import healthRoutes from './src/routes/healthRoutes.js'
import uploadRoutes from './src/routes/uploadRoutes.js'
import errorMiddleware from './src/middlewares/errorMiddleware.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use('/', healthRoutes)
app.use('/upload', uploadRoutes)
app.use(errorMiddleware)

export default app