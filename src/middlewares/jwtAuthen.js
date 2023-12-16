import jwtService from '../services/jwtService.js'

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.sendStatus(401)
  }

  const result = jwtService.verifyAccessToken(token)

  if (!result.success) {
    return res.status(403).json({ error: result.error })
  }

  req.user = result.data
  next()
}

export default { authenticateToken }
