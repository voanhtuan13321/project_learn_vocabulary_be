import swaggerJsdoc from 'swagger-jsdoc'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 3000

const optionsSwaggerJsdoc = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API for ProjectLearnVocabulary (ExpressJS)',
      version: '0.0.1',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      contact: {
        name: 'Võ Anh Tuấn',
        url: 'https://www.facebook.com/13301vat',
        email: 'voanhtuan13321@gmail.com',
      },
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ['src/routes/*.js'],
}
const swaggerSpec = swaggerJsdoc(optionsSwaggerJsdoc)

export default swaggerSpec
