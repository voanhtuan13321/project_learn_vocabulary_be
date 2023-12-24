import Vocabulary from '../models/vocabulary.js'

export const getCountOfVocabularyByUser = (req, res) => {
  const { id } = req.params
  Vocabulary.find({ userId: id })
    .then(result => {
      let numOfDone = 0
      let numOfDoing = 0
      for (let voc of result) {
        if (voc.status) {
          numOfDoing++
        } else {
          numOfDone++
        }
      }
      res.json({ total: result.length, numOfDone, numOfDoing })
    })
    .catch(err => res.status(500).json({ message: err.message }))
}

export const getAllVocabularyByIdUser = (req, res) => {
  const { id } = req.params
  Vocabulary.find({ userId: id })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const getRandomVocabularyByIdUser = (req, res) => {
  const { id } = req.params
  const { quantity } = req.query
  Vocabulary.find({ userId: id, status: true })
    .sort({ numberOfIncorrectTimes: -1, numberOfIncorrectTimes: 1 })
    .limit(quantity)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const addVocabulary = (req, res) => {
  // {
  //   userId: '657bee062c24562c7e0e9b71',
  //   word: 'write',
  //   type: 'v',
  //   meaning: 'viết',
  // }
  const data = {
    ...req.data,
    status: true,
    numberOfCorrectTimes: 0,
    numberOfIncorrectTimes: 0,
  }

  // check already word
  Vocabulary.find({ word: data.word })
    .countDocuments()
    .then(count => {
      if (count > 0) {
        res.json(null)
      }

      const newVocabulary = new Vocabulary(data)
      newVocabulary
        .save()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }))
    })
    .catch(err => res.status(500).json({ message: err.message }))
}

export const updateVocabulary = (req, res) => {
  const {
    id,
    userId,
    word,
    type,
    meaning,
    status,
    numberOfCorrectTimes,
    numberOfIncorrectTimes,
  } = req.body
  Vocabulary.updateOne(
    { _id: id, userId },
    {
      $set: {
        word,
        type,
        meaning,
        status,
        numberOfCorrectTimes,
        numberOfIncorrectTimes,
      },
    },
  )
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const updateNumberTimes = (req, res) => {
  const { id, userId, numberOfCorrectTimes, numberOfIncorrectTimes } = req.body
  Vocabulary.updateOne(
    { _id: id, userId },
    {
      $set: {
        numberOfCorrectTimes,
        numberOfIncorrectTimes,
        status: numberOfCorrectTimes < 100,
      },
    },
  )
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const deleteVocabulary = (req, res) => {
  const { id } = req.params
  Vocabulary.deleteOne({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }))
}
