import _ from 'lodash'
import makeDir from 'make-dir'
import moment from 'moment'
import downloader from 'image-downloader'
import fs from 'fs'
import dotenv from 'dotenv'
import Jimp from 'jimp'
import resizeOptimizeImages from 'resize-optimize-images'

dotenv.config({path: __dirname+'/../../.env'})

const pathUploads = process.env.FOLDER_UPLOAD_BASE;
const currentTime = moment();
let folder = currentTime.format('MM-YYYY');

export default async (url = null, fileName = null) => {
  if (!url) {
    return
  }
  const path = await makeDir(pathUploads+folder);
  const dic = 'uploads/'+(!fileName ? fileNameCross(url).fileName2 : folder + '/' + fileName)
  const options = {
    url: url,
    dest: path
  }
  if (!fs.existsSync(path+'/'+fileNameCross(url).fileName1)) {
    downloader.image(options)
  }
  return dic
}

export const fileNameCross = (url = null) => {
  if (!url) {
    return null
  }
  const fileName = url.substring(url.lastIndexOf('/')+1);
  return {
    fileName1: fileName,
    fileName2: folder + '/' + fileName
  }
}

export const addLogo = async () => {
  await makeDir(pathUploads+folder);
  const list = await fs.readdirSync(pathUploads+'templates')
  for (let i=0; i< list.length; i++) {
    const filename = list[i];
    const fileInput = pathUploads+'templates/'+filename
    const logoInput =  pathUploads+'logo.png'
    const [image, logo] = await Promise.all([
      Jimp.read(fileInput),
      Jimp.read(logoInput)
    ]);
    logo.resize(image.bitmap.width/3.37, Jimp.AUTO);
    image.resize(200, 300);
    
    const LOGO_MARGIN_PERCENTAGE = 10;
    const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
    const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
  
    const X = image.bitmap.width - logo.bitmap.width - xMargin;
    const Y = image.bitmap.height - logo.bitmap.height - yMargin;
    
    const final = await image.composite(logo, X+10, Y+5);
    await final.writeAsync(pathUploads+'test'+'/'+filename);
    await optimizedImg(pathUploads+'test'+'/'+filename)
  }
}

export const addTextImage = async () => {
  await makeDir(pathUploads+folder);
  const list = await fs.readdirSync(pathUploads+'templates')
  const index = _.random(list.length)
  const filename = list[index];
  const fileInput = pathUploads+'templates/'+filename
  const logoInput =  pathUploads+'logo.png'
  const [image, logo] = await Promise.all([
    Jimp.read(fileInput),
    Jimp.read(logoInput)
  ]);
  logo.resize(image.bitmap.width/3.5, Jimp.AUTO);
  image.resize(200, 300);
  
  const LOGO_MARGIN_PERCENTAGE = 10;
  const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
  const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

  const X = image.bitmap.width - logo.bitmap.width - xMargin;
  const Y = image.bitmap.height - logo.bitmap.height - yMargin;
  
  const final = await image.composite(logo, X+8, Y);
  await final.writeAsync(pathUploads+'test'+'/'+filename);
  await optimizedImg(pathUploads+'test'+'/'+filename, pathUploads+'test'+'/'+filename)
  return folder + '/'+filename;
}

export const imageRandom = async () => {
  const list = await fs.readdirSync(pathUploads+'images')
  const index = _.random(list.length)
  return '/uploads/images/'+list[index];
}

export const listImagesOptimize = async () => {
  const list = await fs.readdirSync(pathUploads+'images')
  return list
}

export const optimizedImg = async (pathfile, pathto=null) => {
  const options = {
		images: [pathfile, pathto ? pathto : pathfile],
		width: 200,
		quality: 90
	};
	await resizeOptimizeImages(options);
}