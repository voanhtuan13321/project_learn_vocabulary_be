/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         username
 *         password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         username: "tuanva28"
 *         password: "123456"
 *     User:
 *       type: object
 *       required:
 *         username
 *         password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The name of user
 *         password:
 *           type: string
 *           description: The password of user
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *       example:
 *         _id: 657bee062c24562c7e0e9b71
 *         username: "tuanva28"
 *         password: "123456"
 *         createdAt: 2023-12-15T06:11:18.655+00:00
 *         updatedAt: 2023-12-15T06:11:18.655+00:00
 *         __v: 0
 *     UserUpdate:
 *       type: object
 *       required:
 *         id
 *         username
 *         password
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         id: 657bee062c24562c7e0e9b
 *         username: "tuanva28"
 *         password: "123456"
 *     UsersArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/User'
 *     ErrorMessage:
 *       type: object
 *       properties:
 *         message: string
 *     Token:
 *       type: object
 *       properties:
 *         token: string
 *     Count:
 *       type: object
 *       properties:
 *         total: number
 *         numOfDone: number
 *         numOfDoing: number
 *     Vocabulary:
 *       type: object
 *       properties:
 *         userId: string
 *         word: string
 *         type: string
 *         meaning: string
 *         status: boolean
 *         numberOfCorrectTimes: number
 *         numberOfIncorrectTimes: number
 *       example:
 *         _id: "657bee3bf418ac23267afe86"
 *         userId: "657bee062c24562c7e0e9b71"
 *         word: "write"
 *         type: "v"
 *         meaning: "viết"
 *         status: true
 *         numberOfCorrectTimes: 0
 *         numberOfIncorrectTimes: 0
 *         createdAt: 2023-12-15T06:12:11.479+00:00
 *         updatedAt: 2023-12-15T06:12:11.479+00:00
 *         __v: 0
 *     VocabularyAdd:
 *       type: object
 *       properties:
 *         userId: string
 *         word: string
 *         type: string
 *         meaning: string
 *       example:
 *         userId: "657bee062c24562c7e0e9b71"
 *         word: "write"
 *         type: "v"
 *         meaning: "viết"
 *     VocabularyUpdate:
 *       type: object
 *       properties:
 *         userId: string
 *         word: string
 *         type: string
 *         meaning: string
 *         status: boolean
 *         numberOfCorrectTimes: number
 *         numberOfIncorrectTimes: number
 *       example:
 *         _id: "657bee3bf418ac23267afe86"
 *         userId: "657bee062c24562c7e0e9b71"
 *         word: "write"
 *         type: "v"
 *         meaning: "viết"
 *         status: true
 *         numberOfCorrectTimes: 0
 *         numberOfIncorrectTimes: 0
 *     VocabularyUpdateTimes:
 *       type: object
 *       properties:
 *         userId: string
 *         word: string
 *         type: string
 *         meaning: string
 *         status: boolean
 *         numberOfCorrectTimes: number
 *         numberOfIncorrectTimes: number
 *       example:
 *         id: "657bee3bf418ac23267afe86"
 *         userId: "657bee062c24562c7e0e9b71"
 *         numberOfCorrectTimes: 0
 *         numberOfIncorrectTimes: 0
 *     VocabularyArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Vocabulary'
 * security:
 *   - bearerAuth: []
 */
