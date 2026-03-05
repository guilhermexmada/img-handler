import express from 'express'
import healthRoutes from './routes/healthRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use('/', healthRoutes)
app.use(errorMiddleware) // sempre o último app.use() pois é a última camada p/ interceptar erros

export default app