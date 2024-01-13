import fs from 'fs'
import formidable from 'formidable'
import moment from 'moment'

export const uploadfile = async (req, pathFolder) => {
  console.log(req.query.type);
  const form = new formidable.IncomingForm();
  const url = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      let fileNameArr = files.file.name.split('.')
      let fileType = fileNameArr[fileNameArr.length-1];
      const oldpath = files.file.path
      const fileName = 'image-' + moment().unix() + '.' + fileType
      const newpath = pathFolder +'/' + fileName
      fs.copyFile(oldpath, newpath, async (err) => {
        if (err) resolve(false)
        resolve({type: fileType, fileName: fileName})
      })
    })
  })
  return url
}
