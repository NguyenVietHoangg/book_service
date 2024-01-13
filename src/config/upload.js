import { getQuarter } from '../helpers/common'
import multer from 'multer'
import fs from 'fs'

import * as eResponse from './../config/eResponse'

export const getPath = () => {
  return {
    FOLDER_UPLOAD_BASE: process.env.FOLDER_UPLOAD_BASE ? process.env.FOLDER_UPLOAD_BASE : 'uploads',
    PATH_UPLOAD: `uploads/user-${global.user.id}`,
    PATH_MOVE_TO: `uploads/user-${global.user.id}/${getQuarter()}`
  }
}

export const upload = (data) => {
  const store = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, getPath().PATH_UPLOAD)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const uploadConfig = multer({ storage: store })
  return uploadConfig
}

export const checkPath = (req, res, next) => {
  try {
    if (!fs.existsSync(getPath().PATH_MOVE_TO)) {
      fs.mkdirSync(getPath().PATH_MOVE_TO,{ recursive: true })
    }
    next()
  } catch (err) {
    return eResponse._errorOnTryCatch(err)
  }
}