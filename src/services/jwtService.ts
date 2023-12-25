import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'
import dotenv from 'dotenv'
import IUser from '../interfaces/IUser'
import IVerifyAccesstoken from '../interfaces/IVerifyAccessToken'

dotenv.config()
const SECRET: Secret = process.env.JWT_SECRET_KEY || 'your-secret-key'

const generateAccessToken = (user: IUser): string => {
  const payload: object = { id: user._id, username: user.username }
  const options: SignOptions = { expiresIn: '24h' }
  return jwt.sign(payload, SECRET, options)
}

const verifyAccessToken = (token: string): IVerifyAccesstoken => {
  try {
    const decoded: string | JwtPayload = jwt.verify(token, SECRET)
    return { success: true, data: decoded }
  } catch (err) {
    return {
      success: false,
      error: (err as Error).message || 'Unknown error occurred',
    }
  }
}

export default { generateAccessToken, verifyAccessToken }
