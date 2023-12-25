import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const username: string = process.env.DB_USERNAME ?? ''
const password: string = process.env.DB_PASSWORD ?? ''
const dbName: string = process.env.DB_NAME ?? ''

const connect = (): void => {
  const uri: string = `mongodb+srv://${username}:${password}@tuanva.g1oph44.mongodb.net/${dbName}?retryWrites=true&w=majority`
  mongoose
    .connect(uri)
    .then((): any => console.log('DB is Connected!'))
    .catch(err => console.log('Error connecting', err))
}

export default { connect }
