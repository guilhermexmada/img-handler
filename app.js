import express from 'express'
import expressLayouts from 'express-ejs-layouts' // middleware que permite criar layouts compartilhados em EJS através da variável <%- body %>
import viewRoutes from './src/routes/viewRoutes.js'
import healthRoutes from './src/routes/healthRoutes.js'
import uploadRoutes from './src/routes/uploadRoutes.js'
import processRoutes from './src/routes/processRoutes.js'
import errorMiddleware from './src/middlewares/errorMiddleware.js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), "src/views")) // configura pasta views
app.use(expressLayouts); // configura utilização de layouts
app.set("layout", "layouts/main"); // define o layout padrão das páginas
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello, world!')
// })

app.use('/', viewRoutes)
app.use('/', healthRoutes)
app.use('/upload', uploadRoutes)
app.use('/process', processRoutes)
app.use(errorMiddleware)

export default app