import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './utils/connectDB'
import userRouters from './routes/userRoutes'
import vocabularyRoutes from './routes/vocabularyRoutes'
import swaggerDocs from './utils/swagger'

const app: Express = express()

dotenv.config() // Set up Global configuration access
connectDB.connect() // connect to database

const PORT: string | number = process.env.PORT || 3000
app.listen(PORT, (): void => {
  swaggerDocs(app)
  console.log(`Running on http://localhost:${PORT}`)
})

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
app.get('/', (req: Request, res: Response): any => res.json({ message: '/' }))
app.use('/api/v1/users', userRouters)
app.use('/api/v1/vocabularies', vocabularyRoutes)
