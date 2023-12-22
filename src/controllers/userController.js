import User from '../models/user.js'
import jwtService from '../services/jwtService.js'

const hasUsername = (req, res) => {
  const { username } = req.params
  User.findOne({ username })
    .then(user => res.json({ isExist: !!user }))
    .catch(err => res.status(500).json({ message: err.message }))
}

const getAllUsers = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: err.message }))
}

const login = (req, res) => {
  const { username, password } = req.body
  User.findOne({ username, password })
    .then(user => {
      if (user) {
        const token = jwtService.generateAccessToken(user)
        res.json({ token })
      } else {
        res.json({ message: 'Invalid username or password' })
      }
    })
    .catch(err => res.status(500).json({ message: err.message }))
}

const addUser = (req, res) => {
  // { username: 'new', password: 'cc' }
  const newUser = new User(req.body)
  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ message: err.message }))
}

const updateUser = (req, res) => {
  // { id: '', username: 'new', password: '' }
  const { id, username, password } = req.body
  User.updateOne({ _id: id }, { $set: { username, password } })
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ message: err.message }))
}

const deleteUser = (req, res) => {
  const { id } = req.params
  User.deleteOne({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}

export default {
  hasUsername,
  getAllUsers,
  login,
  addUser,
  updateUser,
  deleteUser,
}
