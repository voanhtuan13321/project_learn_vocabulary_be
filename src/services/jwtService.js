import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECRET = process.env.JWT_SECRET_KEY || 'your-secret-key'

const generateAccessToken = user => {
  const payload = {
    id: user._id,
    username: user.username,
  }

  const options = { expiresIn: '1h' }
  return jwt.sign(payload, SECRET, options)
}

const verifyAccessToken = token => {
  try {
    const decoded = jwt.verify(token, SECRET)
    return { success: true, data: decoded }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export default { generateAccessToken, verifyAccessToken }
