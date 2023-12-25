import express, { Router } from 'express'
import jwtAuthen from '../middlewares/jwtAuthen'
import {
  addVocabulary,
  deleteVocabulary,
  getAllVocabularyByIdUser,
  getCountOfVocabularyByUser,
  getRandomVocabularyByIdUser,
  updateNumberTimes,
  updateVocabulary,
} from '../controllers/vocabularyController'

const route: Router = express.Router()

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
route.get('/countion/:id', getCountOfVocabularyByUser)

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
route.get('/:id', getAllVocabularyByIdUser)

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
route.get('/random/:id', getRandomVocabularyByIdUser)

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
route.post('', jwtAuthen.authenticateToken, addVocabulary)

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
route.put('', jwtAuthen.authenticateToken, updateVocabulary)

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
route.put('/times', jwtAuthen.authenticateToken, updateNumberTimes)

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
route.delete('/:id', jwtAuthen.authenticateToken, deleteVocabulary)

export default route
