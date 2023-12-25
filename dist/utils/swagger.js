"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_ui_dist_1 = require("swagger-ui-dist");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
dotenv_1.default.config(); // Set up Global configuration access
const PORT = process.env.PORT || 3000;
const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'API for ProjectLearnVocabulary (ExpressJS)',
            version: '0.0.1',
            description: 'This is a simple CRUD API application made with Express and documented with Swagger',
            contact: {
                name: 'Võ Anh Tuấn',
                url: 'https://www.facebook.com/13301vat',
                email: 'voanhtuan13321@gmail.com',
            },
        },
        servers: [
            { url: `http://localhost:${PORT}` },
            { url: `project-learn-vocabulary-be.vercel.app` },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Login: {
                    type: 'object',
                    properties: { username: 'string', password: 'string' },
                    required: { username: true, password: true },
                    example: { username: 'tuanva28', password: '123456' },
                },
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
                },
                UserUpdate: {
                    type: 'object',
                    properties: { id: 'string', username: 'string', password: 'string' },
                    required: { id: true, username: true, password: true },
                    example: {
                        id: '657bee062c24562c7e0e9b',
                        username: 'tuanva28',
                        password: '123456',
                    },
                },
                UsersArray: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                },
                ErrorMessage: {
                    type: 'object',
                    properties: { message: 'string' },
                },
                Token: {
                    type: 'object',
                    properties: { token: 'string' },
                },
                Count: {
                    type: 'object',
                    properties: {
                        total: 'number',
                        numOfDone: 'number',
                        numOfDoing: 'number',
                    },
                },
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
                },
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
                },
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
                },
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
                },
                VocabularyArray: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Vocabulary' },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['src/routes/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app) => {
    app.use(express_1.default.static((0, swagger_ui_dist_1.absolutePath)()));
    app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
    }));
    app.get('/api/docs.json', (req, res) => {
        res.json(swaggerSpec);
    });
};
exports.default = swaggerDocs;
//# sourceMappingURL=swagger.js.map