import express from 'express'
import jwtAuthen from '../middlewares/jwtAuthen.js'
import {
  addUser,
  deleteUser,
  getAllUsers,
  hasUsername,
  login,
  updateUser,
} from '../controllers/userController.js'

const route = express.Router()

/**
 * @swagger
 * \/api\/v1\/users\/check-exist\/{username}:
 *   post:
 *     summary: check exist username
 *     tags: [Users]
 *     server: \/api\/v1\/users\/check-exist
 *     parameters:
 *       - name: username
 *         in: path
 *         description: Username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: logined
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/Token'
 *       500:
 *         description: Some server error
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/ErrorMessage'
 */
route.get('/check-exist/:username', hasUsername)

/**
 * @swagger
 * \/api\/v1\/users\/login:
 *   post:
 *     summary: login
 *     tags: [Users]
 *     server: \/api\/v1\/users\/login
 *     requestBody:
 *       required: true
 *       content:
 *         application\/json:
 *           schema:
 *             $ref: '#\/components\/schemas\/Login'
 *     responses:
 *       200:
 *         description: logined
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/Token'
 *       500:
 *         description: Some server error
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/ErrorMessage'
 */
route.post('/login', login)

/**
 * @swagger
 * \/api\/v1\/users\/register:
 *   post:
 *     summary: Register a user
 *     tags: [Users]
 *     server: \/api\/v1\/users\/register
 *     requestBody:
 *       required: true
 *       content:
 *         application\/json:
 *           schema:
 *             $ref: '#\/components\/schemas\/Login'
 *     responses:
 *       200:
 *         description: registed
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/User'
 *       500:
 *         description: Some server error
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/ErrorMessage'
 */
route.post('/register', addUser)

/**
 * @swagger
 * \/api\/v1\/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     server: \/api\/v1\/users
 *     responses:
 *       200:
 *         description: List all users
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/UsersArray'
 *       500:
 *         description: Some server error
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/ErrorMessage'
 */
route.get('', getAllUsers)

/**
 * @swagger
 * \/api\/v1\/users:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     server: \/api\/v1\/users
 *     requestBody:
 *       required: true
 *       content:
 *         application\/json:
 *           schema:
 *             $ref: '#\/components\/schemas\/UserUpdate'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/User'
 *       500:
 *         description: Some server error
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/ErrorMessage'
 */
route.put('', jwtAuthen.authenticateToken, updateUser)

/**
 * @swagger
 * \/api\/v1\/users\/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     server: \/api\/v1\/users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/User'
 *       500:
 *         description: Some server error
 *         content:
 *           application\/json:
 *             schema:
 *               $ref: '#\/components\/schemas\/ErrorMessage'
 */
route.delete('/:id', jwtAuthen.authenticateToken, deleteUser)

export default route
