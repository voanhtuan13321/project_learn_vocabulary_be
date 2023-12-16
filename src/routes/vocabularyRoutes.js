import express from 'express'
import jwtAuthen from '../middlewares/jwtAuthen.js'
import vocabularyController from '../controllers/vocabularyController.js'

const route = express.Router()

/**
 * @swagger
 * /api/v1/vocabularies/countion/{id}:
 *   get:
 *     summary: count vocabulary of user
 *     tags: [Vocabulary]
 *     server: /api/v1/vocabularies/countion
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
route.get(
  '/countion/:id',
  jwtAuthen.authenticateToken,
  vocabularyController.getCountOfVocabularyByUser,
)

/**
 * @swagger
 * /api/v1/vocabularies/{id}:
 *   get:
 *     summary: get all vocabularies of a user
 *     tags: [Vocabulary]
 *     server: /api/v1/vocabularies
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
route.get(
  '/:id',
  jwtAuthen.authenticateToken,
  vocabularyController.getAllVocabularyByIdUser,
)

/**
 * @swagger
 * /api/v1/vocabularies/random/{id}:
 *   get:
 *     summary: get random vocabularies of a user
 *     tags: [Vocabulary]
 *     server: /api/v1/vocabularies/random
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
route.get(
  '/random/:id',
  jwtAuthen.authenticateToken,
  vocabularyController.getRandomVocabularyByIdUser,
)

/**
 * @swagger
 * /api/v1/vocabularies:
 *   post:
 *     summary: add new vocabulary
 *     tags: [Vocabulary]
 *     server: /api/v1/vocabularies
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
route.post('', jwtAuthen.authenticateToken, vocabularyController.addVocabulary)

/**
 * @swagger
 * /api/v1/vocabularies:
 *   put:
 *     summary: update vocabulary
 *     tags: [Vocabulary]
 *     server: /api/v1/vocabularies
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
route.put(
  '',
  jwtAuthen.authenticateToken,
  vocabularyController.updateVocabulary,
)

/**
 * @swagger
 * /api/v1/vocabularies/times:
 *   put:
 *     summary: update vocabulary
 *     tags: [Vocabulary]
 *     server: /api/v1/vocabularies/times
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
route.put(
  '/times',
  jwtAuthen.authenticateToken,
  vocabularyController.updateNumberTimes,
)

/**
 * @swagger
 * /api/v1/vocabularies/{id}:
 *   delete:
 *     summary: Delete Vocabulary
 *     tags: [Vocabulary]
 *     server: /api/v1/vocabularies
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
route.delete(
  '/:id',
  jwtAuthen.authenticateToken,
  vocabularyController.deleteVocabulary,
)

export default route
