import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import { absolutePath } from 'swagger-ui-dist'

import connectDB from './src/utils/connectDB.js'
import userRouters from './src/routes/userRoutes.js'
import vocabularyRoutes from './src/routes/vocabularyRoutes.js'
import swaggerSpec from './src/configs/swaggerSpec.js'
const app = express()

dotenv.config() // Set up Global configuration access
connectDB.connect() // connect to database

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))

app.use(express.static('public'))
app.use(express.static(absolutePath()))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
app.get('/', (req, res) => res.json({ message: '/' }))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/v1/users', userRouters)
app.use('/api/v1/vocabularies', vocabularyRoutes)
