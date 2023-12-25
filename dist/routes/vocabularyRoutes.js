"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtAuthen_1 = __importDefault(require("../middlewares/jwtAuthen"));
const vocabularyController_1 = require("../controllers/vocabularyController");
const route = express_1.default.Router();
/**
 * @swagger
 * '/api/v1/vocabularies/countion/{id}':
 *   get:
 *     summary: count vocabulary of user
 *     tags: [Vocabulary]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Count'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
route.get('/countion/:id', vocabularyController_1.getCountOfVocabularyByUser);
/**
 * @swagger
 * '/api/v1/vocabularies/{id}':
 *   get:
 *     summary: get all vocabularies of a user
 *     tags: [Vocabulary]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: list of vocabularies
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VocabularyArray'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
route.get('/:id', vocabularyController_1.getAllVocabularyByIdUser);
/**
 * @swagger
 * '/api/v1/vocabularies/random/{id}':
 *   get:
 *     summary: get random vocabularies of a user
 *     tags: [Vocabulary]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: list of vocabularies
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VocabularyArray'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
route.get('/random/:id', vocabularyController_1.getRandomVocabularyByIdUser);
/**
 * @swagger
 * /api/v1/vocabularies:
 *   post:
 *     summary: add new vocabulary
 *     tags: [Vocabulary]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VocabularyAdd'
 *     responses:
 *       200:
 *         description: result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vocabulary'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
route.post('', jwtAuthen_1.default.authenticateToken, vocabularyController_1.addVocabulary);
/**
 * @swagger
 * /api/v1/vocabularies:
 *   put:
 *     summary: update vocabulary
 *     tags: [Vocabulary]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VocabularyUpdate'
 *     responses:
 *       200:
 *         description: result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vocabulary'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
route.put('', jwtAuthen_1.default.authenticateToken, vocabularyController_1.updateVocabulary);
/**
 * @swagger
 * '/api/v1/vocabularies/times':
 *   put:
 *     summary: update vocabulary
 *     tags: [Vocabulary]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VocabularyUpdateTimes'
 *     responses:
 *       200:
 *         description: result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vocabulary'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
route.put('/times', jwtAuthen_1.default.authenticateToken, vocabularyController_1.updateNumberTimes);
/**
 * @swagger
 * '/api/v1/vocabularies/{id}':
 *   delete:
 *     summary: Delete Vocabulary
 *     tags: [Vocabulary]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Vocabulary ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vocabulary'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
route.delete('/:id', jwtAuthen_1.default.authenticateToken, vocabularyController_1.deleteVocabulary);
exports.default = route;
//# sourceMappingURL=vocabularyRoutes.js.map