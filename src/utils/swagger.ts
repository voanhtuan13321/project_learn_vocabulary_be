import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import swaggerUiExpress from 'swagger-ui-express'
import { absolutePath } from 'swagger-ui-dist'
import swaggerJSDoc, {
  Contact,
  Information,
  Options,
  SwaggerDefinition,
  Server,
  SecurityRequirement,
  SecurityScheme,
  Schema,
} from 'swagger-jsdoc'

dotenv.config() // Set up Global configuration access
const PORT: string | number = process.env.PORT || 3000

const options: Options = {
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
      } as Contact,
    } as Information,
    servers: [
      { url: `http://localhost:${PORT}` } as Server,
      { url: `project-learn-vocabulary-be.vercel.app` } as Server,
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        } as SecurityScheme,
      },
      schemas: {
        Login: {
          type: 'object',
          properties: { username: 'string', password: 'string' },
          required: { username: true, password: true },
          example: { username: 'tuanva28', password: '123456' },
        } as Schema,
        User: {
          type: 'object',
          properties: {
            _id: 'string',
            username: 'string',
            password: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            __v: 'number',
          },
          require: { username: true, password: true },
          example: {
            _id: '657bee062c24562c7e0e9b71',
            username: 'tuanva28',
            password: '123456',
            createdAt: '2023-12-15T06:11:18.655+00:00',
            updatedAt: '2023-12-15T06:11:18.655+00:00',
            __v: 0,
          },
        } as Schema,
        UserUpdate: {
          type: 'object',
          properties: { id: 'string', username: 'string', password: 'string' },
          required: { id: true, username: true, password: true },
          example: {
            id: '657bee062c24562c7e0e9b',
            username: 'tuanva28',
            password: '123456',
          },
        } as Schema,
        UsersArray: {
          type: 'array',
          items: { $ref: '#/components/schemas/User' },
        } as Schema,
        ErrorMessage: {
          type: 'object',
          properties: { message: 'string' },
        } as Schema,
        Token: {
          type: 'object',
          properties: { token: 'string' },
        } as Schema,
        Count: {
          type: 'object',
          properties: {
            total: 'number',
            numOfDone: 'number',
            numOfDoing: 'number',
          },
        } as Schema,
        Vocabulary: {
          type: 'object',
          properties: {
            userId: 'string',
            word: 'string',
            type: 'string',
            meaning: 'string',
            status: 'boolean',
            numberOfCorrectTimes: 'number',
            numberOfIncorrectTimes: 'number',
          },
          example: {
            _id: '657bee3bf418ac23267afe86',
            userId: '657bee062c24562c7e0e9b71',
            word: 'write',
            type: 'v',
            meaning: 'viết',
            status: true,
            numberOfCorrectTimes: 0,
            numberOfIncorrectTimes: 0,
            createdAt: '2023-12-15T06:12:11.479+00:00',
            updatedAt: '2023-12-15T06:12:11.479+00:00',
            __v: 0,
          },
        } as Schema,
        VocabularyAdd: {
          type: 'object',
          properties: {
            userId: 'string',
            word: 'string',
            type: 'string',
            meaning: 'string',
          },
          example: {
            userId: '657bee062c24562c7e0e9b71',
            word: 'write',
            type: 'v',
            meaning: 'viết',
          },
        } as Schema,
        VocabularyUpdate: {
          type: 'object',
          properties: {
            userId: 'string',
            word: 'string',
            type: 'string',
            meaning: 'string',
            status: 'boolean',
            numberOfCorrectTimes: 'number',
            numberOfIncorrectTimes: 'number',
          },
          example: {
            _id: '657bee3bf418ac23267afe86',
            userId: '657bee062c24562c7e0e9b71',
            word: 'write',
            type: 'v',
            meaning: 'viết',
            status: true,
            numberOfCorrectTimes: 0,
            numberOfIncorrectTimes: 0,
          },
        } as Schema,
        VocabularyUpdateTimes: {
          type: 'object',
          properties: {
            userId: 'string',
            word: 'string',
            type: 'string',
            meaning: 'string',
            status: 'boolean',
            numberOfCorrectTimes: 'number',
            numberOfIncorrectTimes: 'number',
          },
          example: {
            id: '657bee3bf418ac23267afe86',
            userId: '657bee062c24562c7e0e9b71',
            numberOfCorrectTimes: 0,
            numberOfIncorrectTimes: 0,
          },
        } as Schema,
        VocabularyArray: {
          type: 'array',
          items: { $ref: '#/components/schemas/Vocabulary' },
        } as Schema,
      },
    },
    security: [{ bearerAuth: [] } as SecurityRequirement],
  } as SwaggerDefinition,
  apis: ['src/routes/*.ts'],
}

const swaggerSpec: object = swaggerJSDoc(options)

const swaggerDocs = (app: Express): void => {
  app.use(express.static(absolutePath()))
  app.use(
    '/api/docs',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerSpec, {
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
    }),
  )
  app.get('/api/docs.json', (req: Request, res: Response): void => {
    res.json(swaggerSpec)
  })
}

export default swaggerDocs
