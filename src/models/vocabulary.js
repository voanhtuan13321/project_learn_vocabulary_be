import mongoose from 'mongoose'

const vocabularySchema = new mongoose.Schema(
  {
    userId: String,
    word: String,
    type: String,
    meaning: String,
    status: Boolean,
    numberOfCorrectTimes: Number,
    numberOfIncorrectTimes: Number,
  },
  { timestamps: true },
)

const Vocabulary = mongoose.model('Vocabulary', vocabularySchema)

export default Vocabulary
