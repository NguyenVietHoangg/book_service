import express from 'express'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import makeDir from 'make-dir'
import fs from 'fs'
import * as _e from '../../../config/eResponse'
import { ADD_SUCCESS, UPDATE_SUCCESS, SUCCESS, ERROR, NOT_FOUND } from '../../../config/typeAlias'
import mediaSv from './service'
import formidable from 'formidable'

const pathUploads = process.env.FOLDER_UPLOAD_BASE ? process.env.FOLDER_UPLOAD_BASE : 'public';
const router = express.Router()
const folder = `${moment().format('YYYY')}/${moment().format('MM')}`
const pathFolderObsolute = `${pathUploads}/assets/uploads/${folder}`
const pathFolderRelative = `assets/uploads/${folder}`

/**
 * get pagination list
 */
router.post(`/media/mediaList`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await mediaSv.getMediaList(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})

router.post(`/media/filesUpload`, async (req, res) =>{
  const form = new formidable.IncomingForm();
  await makeDir(`${pathFolderObsolute}`);
  const fileObj = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      let fileNameArr = files.file.originalFilename.split('.')
      let fileType = fileNameArr[fileNameArr.length-1];
      let mimeType = files.file.mimetype;
      const oldpath = files.file.filepath
      const fileName = `${moment().unix()}-${uuidv4()}.${fileType}`
      const newpath = `${pathFolderObsolute}/${fileName}`
      fs.copyFile(oldpath, newpath, async (err) => {
        if (err) resolve(false)
        resolve({
          name: fileName,
          filename: fileName,
          path: `${pathFolderRelative}/${fileName}`,
          link: `${process.env.MEDIA_URL}/${pathFolderRelative}/${fileName}`,
          type: fileType,
          mimetype: mimeType,
          inside: 1,
          status: 1
        })
      })
    })
  })
  const newId = await mediaSv.saveMediaDetailById('new', fileObj)
  fileObj.id = newId
  res.end(_e._successJson(SUCCESS, fileObj))
})

/**
 * get story detail by id
 */
 router.get(`/story/getMediaDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  let data = await mediaSv.getMediaDetailById(id)
  if (!data) {
    res.end(_e._errorByHandJSon(NOT_FOUND))
  }
  res.end(_e._successJson('Success', data))
})
export default router