import express from 'express'
import md5 from 'md5'
import _ from 'lodash'
import { checkValidPhone, checkValidEmail } from './../../helpers/common'

import { NOT_EXIST_ACCOUNT, ERROR_CREATE_TOKEN, 
  VALUE_REQUEST_IS_EMPTY, INVALID_PHONE_OR_EMAIL,
  LOCKED_ACCOUNT, NOT_ACTIVED_ACCOUNT } from './../../config/typeAlias'
import { signToken } from './../../helpers/jwtToken'
import * as _e from './../../config/eResponse'
import { SALT_PASSWORD } from './../../config/common'
import { fetchOne, createRow } from './../../adapters/fetchData'
import { decodeToken } from './../../helpers/jwtToken'
import cache from './../../cache'

const router = express.Router()

export default router