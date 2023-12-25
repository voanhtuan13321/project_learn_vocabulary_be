import { Request, Response } from 'express'
import Vocabulary from '../models/vocabulary'
import { FilterQuery, UpdateQuery } from 'mongoose'
import IVocabulary from '../interfaces/IVocabulary'

export const getCountOfVocabularyByUser = (
  req: Request,
  res: Response,
): void => {
  const { id }: any = req.params
  const filterQuery: FilterQuery<IVocabulary> = { userId: id }

  Vocabulary.find(filterQuery)
    .then(result => {
      const initReduce: any = {
        total: result.length,
        numOfDone: 0,
        numOfDoing: 0,
      }
      const counts = result.reduce((acc, voc) => {
        voc.status ? acc.numOfDoing++ : acc.numOfDone++
        return acc
      }, initReduce)
      res.json(counts)
    })
    .catch(err => res.status(500).json({ message: err.message }))
}

export const getAllVocabularyByIdUser = (req: Request, res: Response): void => {
  const { id }: any = req.params
  const filterQuery: FilterQuery<IVocabulary> = { userId: id }

  Vocabulary.find(filterQuery)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const getRandomVocabularyByIdUser = (
  req: Request,
  res: Response,
): void => {
  const { id }: any = req.params
  const { quantity }: any = req.query ?? 0
  const filterQuery: FilterQuery<IVocabulary> = { userId: id, status: true }

  Vocabulary.find(filterQuery)
    .sort({ numberOfIncorrectTimes: -1, numberOfCorrectTimes: 1 })
    .limit(Number(quantity) || 0)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const addVocabulary = (req: Request, res: Response): void => {
  // {
  //   userId: '657bee062c24562c7e0e9b71',
  //   word: 'write',
  //   type: 'v',
  //   meaning: 'viết',
  // }
  const data: IVocabulary = {
    ...req.body,
    status: true,
    numberOfCorrectTimes: 0,
    numberOfIncorrectTimes: 0,
  }

  // check already word
  const filterQuery: FilterQuery<IVocabulary> = {
    userId: data.userId,
    word: data.word,
    type: data.type,
  }

  Vocabulary.find(filterQuery)
    .countDocuments()
    .then(count => {
      if (count > 0) {
        res.json(null)
      } else {
        const newVocabulary = new Vocabulary(data)
        newVocabulary.save().then(result => res.json(result))
      }
    })
    .catch(err => res.status(500).json({ message: err.message }))
}

export const updateVocabulary = (req: Request, res: Response): void => {
  const {
    id,
    userId,
    word,
    type,
    meaning,
    status,
    numberOfCorrectTimes,
    numberOfIncorrectTimes,
  }: IVocabulary = req.body
  const filterQuery: FilterQuery<IVocabulary> = { _id: id, userId }
  const updateQuery: UpdateQuery<IVocabulary> = {
    $set: {
      word,
      type,
      meaning,
      status,
      numberOfCorrectTimes,
      numberOfIncorrectTimes,
    },
  }

  Vocabulary.updateOne(filterQuery, updateQuery)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const updateNumberTimes = (req: Request, res: Response): void => {
  const {
    id,
    userId,
    numberOfCorrectTimes,
    numberOfIncorrectTimes,
  }: IVocabulary = req.body
  const filterQuery: FilterQuery<IVocabulary> = { _id: id, userId }
  const updateQuery: UpdateQuery<IVocabulary> = {
    $set: {
      numberOfCorrectTimes,
      numberOfIncorrectTimes,
      status: numberOfCorrectTimes < 100,
    },
  }

  Vocabulary.updateOne(filterQuery, updateQuery)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const deleteVocabulary = (req: Request, res: Response): void => {
  const { id }: any = req.params
  const filterQuery: FilterQuery<IVocabulary> = { _id: id }

  Vocabulary.deleteOne(filterQuery)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}
