import { NextFunction, Request, Response } from 'express'
import jwtService from '../services/jwtService'
import IVerifyAccesstoken from '../interfaces/IVerifyAccessToken'
import { IncomingHttpHeaders } from 'http'

interface IAuthenticatedRequest extends Request {
  user?: IVerifyAccesstoken['data']
}

const authenticateToken = (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader: string | undefined = (req.headers as IncomingHttpHeaders)[
    'authorization'
  ]
  const token: string | undefined = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.sendStatus(401)
    return
  }

  const result: IVerifyAccesstoken = jwtService.verifyAccessToken(token)

  if (!result.success) {
    res.status(403).json({ error: result.error })
    return
  }

  req.user = result.data
  next()
}

export default { authenticateToken }
