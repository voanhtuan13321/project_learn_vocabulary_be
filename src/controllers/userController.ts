import { Request, Response } from 'express'
import { FilterQuery, UpdateQuery } from 'mongoose'
import User from '../models/user'
import IUser from '../interfaces/IUser'
import jwtService from '../services/jwtService'

export const hasUsername = (req: Request, res: Response): void => {
  const { username }: any = req.params
  const filterQuery: FilterQuery<IUser> = { username }

  User.findOne(filterQuery)
    .then(user => res.json({ isExist: !!user }))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const getAllUsers = (req: Request, res: Response): void => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const login = (req: Request, res: Response): void => {
  const { username, password }: IUser = req.body
  const filterQuery: FilterQuery<any> = { username, password }

  User.findOne(filterQuery)
    .then(user => {
      if (user) {
        const token = jwtService.generateAccessToken(user as IUser)
        res.json({ token })
      } else {
        res.json({ message: 'Invalid username or password' })
      }
    })
    .catch(err => res.status(500).json({ message: err.message }))
}

export const addUser = (req: Request, res: Response): void => {
  // { username: 'new', password: 'cc' }
  const newUser = new User(req.body)
  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const updateUser = (req: Request, res: Response): void => {
  // { id: '', username: 'new', password: '' }
  const { id, username, password }: IUser = req.body
  const filterQuery: FilterQuery<IUser> = { _id: id }
  const updateQuery: UpdateQuery<IUser> = { $set: { username, password } }

  User.updateOne(filterQuery, updateQuery)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const deleteUser = (req: Request, res: Response): void => {
  const { id }: any = req.params
  const filterQuery: FilterQuery<IUser> = { _id: id }

  User.deleteOne(filterQuery)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}
