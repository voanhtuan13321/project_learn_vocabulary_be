import mongoose, { Model, Schema } from 'mongoose'

const userSchema: Schema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)
export default User
