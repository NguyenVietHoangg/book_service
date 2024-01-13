import moment from 'moment'
import { decodeToken, validPermissions } from '../helpers/jwtToken'
import * as eResponse from '../config/eResponse'
import { INVALID_TOKEN, INVALID_PREMISSION } from './../config/typeAlias'
import { countAll } from '../adapters/fetchData'
import cache from '../cache'

export const auth = async (req, res, next) => {
  const token = req.header('authorization')
  const user = decodeToken(token)
  if (!user) {
    return res.send(eResponse._errorByHand(INVALID_TOKEN))
  }
  if (!validPermissions(user)) {
    return res.send(eResponse._errorByHand(INVALID_PREMISSION))
  }
  if (Date.now() > user.exp * 1000) {
    return res.send(eResponse._errorByHand(INVALID_TOKEN))
  }
  const keyCache = cache.genKeyPublic('black_list_', {user: user.id})
  let tokenCheck = await cache.get(keyCache, false)
  if (!tokenCheck) {
    const tokenBlacklistExist = await countAll('Blacklist_Token', {where: {token: token}})
    if (tokenBlacklistExist) {
      return res.send(eResponse._errorByHand(INVALID_TOKEN))
    }
  } else if (tokenCheck && token === tokenCheck) {
    return res.send(eResponse._errorByHand(INVALID_TOKEN))
  }
  const userRoles = decoded.roles || [];
  const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

  next()
}
export default auth