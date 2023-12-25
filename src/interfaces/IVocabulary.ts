import { Document } from 'mongoose'

export default interface IVocabulary extends Document {
  userId: string
  word: string
  type: string
  meaning: string
  status: boolean
  numberOfCorrectTimes: number
  numberOfIncorrectTimes: number
  createdAt?: Date
  updatedAt?: Date
}
