import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

const connect = () => {
  const uri = `mongodb+srv://${username}:${password}@tuanva.g1oph44.mongodb.net/${dbName}?retryWrites=true&w=majority`
  mongoose
    .connect(uri)
    .then(() => console.log('DB is Connected!'))
    .catch(err => console.log('Error connecting', err))
}

export default { connect }
