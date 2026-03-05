import express from 'express'
import healthRoutes from './routes/healthRoutes.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', healthRoutes)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

export default app