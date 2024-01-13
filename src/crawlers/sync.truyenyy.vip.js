import moment from 'moment'

import shell from 'shelljs'
import config from './config'
import { addLogo, imageRandom, listImagesOptimize } from './saveUrlFile'
import * as Model from '../database/models'
import { xoaDau, clearUnicode, convertSlugStory } from '../helpers/common'
import { updateStoryToCategory, updateTotalChapter, itemSyncChapterNewest, removeRefStory } from './sync.common'

const PREFIX_SOURCE = 'truyenyy.vip'
// lấy thông tin chi tiết của một truyện
const getStoryDetail = async (url, storyId=null) => {
  if (!url) {
    url = 'https://truyenyy.vip/truyen/dai-mong-chu/'
    return
  }
  let selector = null
  try {
    selector = await config.loadCheerio(url)
  } catch (error) {
    console.log('error', error)
    return false
  }
  await removeRefStory(storyId)
  const result = selector('.content')
  // return
  var x = (selector('head').find('meta[property="og:title"]').attr('content')).split('-')
  const storyName = x[0].trim()
  return;
  const author = x[1].trim()
  const images = ''
  const genre = clearUnicode((selector(result.find('.novel-meta tr')[0]).text()).replace('Thể loại', ''))
  const resource = 'truyenyy-vip'
  const crawlerFrom = PREFIX_SOURCE;
  const state = clearUnicode((selector(result.find('.novel-meta tr')[1]).text()).replace('Trạng thái', ''))
  const shortDescription = clearUnicode(result.find('#summary_markdown').html().replace('<button class="btn_nude d-block w-100 left py-1" style="text-align: left;" id="id_collapse_summary"><i class="fas fa-caret-up"></i> Thu Gọn Khung</button>', ''))
  const slugStory = url.split('/')[4]
  // random image
  const imageSave = await imageRandom()
  const story = await Model['story'].findOne({
    attributes: ['id','slug', 'crawlerFrom'],
    where: {
      slug: convertSlugStory(slugStory)
    }
  })
  if (story) {
    await Model['chapter'].update({updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'), crawlerFrom: PREFIX_SOURCE}, {where: {storyId: story.id}}) // cập nhật đi để tạo lại chương
  }
  let obj = { name: storyName, slug: convertSlugStory(slugStory), link: url, source_crawler_1: url, images, imageSave, author, genre, resource, state, rate: 9.5, shortDescription, paginate: null, listPageChapter: null, status: 'on', totalPage: null, haveChapterContent: 1, crawlerFrom, totalChapter: null, createdAt: moment().format('YYYY/MM/DD HH:mm:ss'), updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),}
  let storySave = null;
  try {
    storySave = (!story) ? await Model['story'].create(obj) : story
  } catch (error) {
    console.log('=> error save story:'+url, error)
    return false
  }
  await updateStoryToCategory(storySave.id, obj.genre)
  await updateTotalChapter(storySave.id);
  storySave = await Model['story'].findOne({
    attributes: ['id','slug', 'crawlerFrom'],
    where: {
      id: storySave.id
    }
  });
  // lấy content tường chương
  const totalScan = 3000;
  let {count} = await Model['chapter'].findAndCountAll({
    attributes: ['id'],
    where: {
      storyId: storySave.id
    },
    limit:1
  })
  const startI = Math.floor(count/50) || 1;

  let chapters = []
  let step = 50
  for (let i = startI; i < 3000; i++) {
    const urlChuong = 'https://truyenyy.vip/truyen/'+slugStory+'/chuong-'+i+'.html'
    const chapterObj = await getChapter(urlChuong, convertSlugStory(slugStory), i)
    if (chapterObj) {
      chapters.push(chapterObj);
    }
    if (chapters.length === step || i === 2999) {
      await Model.chapter.bulkCreate(chapters, { ignoreDuplicates : true});
      chapters = [];
    }
  }
  
  setTimeout(function() {
    updateTotalChapter(storySave.id);
    itemSyncChapterNewest(storySave.id);
  }, 500);
  console.log("=============================", storySave.id);
  console.log('xong getStoryDetail !!!!!!!!!!!!!!: '+url)
  return true
}

// lấy dữ liệu của từng chương
const getChapter = async (link, storyId, slugStory, chapterOrder=null) => {
  if (!link || !storyId || !slugStory) {
    return null;
  } 
  let selector = null
  try {
    selector = await config.loadCheerio(link)
  } catch (error) {
    console.log('=> error crawler chapter: '+link, error)
    return false
  }
  let chapterName = clearUnicode(selector('.box').find('h1').text())
  let chapter = selector('#inner_chap_content_1').find('p')
  let arr = chapter.map((index, el) => {
    return selector(el).text()
  }).get();
  const arrDescription = arr
  const objChapter = {
    storyId: storyId,
    name: chapterName,
    slug: xoaDau(chapterName),
    slugUnique: slugStory+ '-atruyenhay-'+xoaDau(chapterName),
    nameUnique: slugStory+ '-atruyenhay-'+xoaDau(chapterName),
    link: link,
    source_crawler_1: link,
    description: clearUnicode(arrDescription.join('<br />')).replace('http://ｔruyencuatui.Net', 'truyenfullonline.com').replace('truyenyy', 'truyenfullonline'),
    description2: clearUnicode(JSON.stringify(arrDescription)),
    chapterOrder: chapterOrder,
    status: 'on',
    createdAt: moment().format('YYYY/MM/DD HH:mm:ss'), 
    updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
  }
  return objChapter
  // check tồn tại chapter chưa, nếu tồn tại rồi thì break luôn chương trình vì đang lấy thứ tự từ thấp đến cao
  const chapterDetail = await Model['chapter'].findOne({attributes:['id', 'description'], where: {slugUnique: objChapter.slugUnique, storyId: storyId}})
  if (chapterDetail) {
    await Model['chapter'].update({ description: objChapter.description, description2: objChapter.description2, updatedAt: chapterDetail.updatedAt}, {where: {id: chapterDetail.id}})
    return false
  }
  try {
    await Model['chapter'].create(objChapter)
  } catch (error) {
    console.log('=> error save chapter:' + link, error)
  }
  return true
}

// lấy link của thể loại truyện
const getLinkInCategory = async (link=null) => {
  const selector = await config.loadCheerio(link)
  const result = selector('.col-truyen-main .col-xs-7 h3.truyen-title').find('a')
  const links = result.map((index, el) => {
    return selector(el).attr('href')
  }).get()
  return links.reverse()
}

// cập nhật truyện mới từ truyện full
const getNewestStory = async () => {
  for (let i=4; i>=1; i--) {
    const endpoint = 'https://truyenyy.vip/danh-sach/truyen-moi/trang-'+i;
    let links = null;
    try {
      links = await getLinkInCategory(endpoint)
    } catch (error) {
      console.log('=> error getLinkInCategory:'+endpoint, error)
      continue
    }
    links.map(item => getStoryDetail(item))
  }
  console.log('xong getNewestStory !!!!!!!!!!!!!!: ')
}

// cập nhật truyện hoàn thành từ truyenfull
const getFullStory = async () => {
  for (let i=4; i>=1; i--) {
    const endpoint = 'https://truyenyy.vip/danh-sach/truyen-full/trang-'+i;
    let links = null;
    try {
      links = await getLinkInCategory(endpoint)
    } catch (error) {
      console.log('=> error getLinkInCategory:'+endpoint, error)
      continue
    }
    links.map(item => getStoryDetail(item))
  }
  console.log('xong getFullStory !!!!!!!!!!!!!!: ')
}

const downimg = async () => {
  await addLogo()
  // await addTextImage()
  console.log('ok!')
}

const updateImageForstory = async () => {
  const list = await Model['story'].findAll({
    attributes: ['id']
  });
  for(let i=0; i< list.length; i++) {
    const img = await imageRandom()
    const data = {imageSave: img}
    await Model['story'].update(data, {where:{ id: list[i].id}})
    console.log(list[i].id, img)
  }
  console.log('xong updated updateImageForstory !!!!!!!')
}

const updateMedia = async () => {
  const list = await listImagesOptimize()
  for(let i=0; i< list.length; i++) {
    const data = {
      name: list[i],
      alt: 'truyenfullonline, cập nhật liên tục hàng ngày - '+list[i],
      path: '/uploads/images/'+list[i],
      fullpath: '/public/uploads/images/'+list[i],
      type: 'jpg',
      category: 'image',
      inside: 'true',
      status: 'on',
      createdAt: moment().format('YYYY/MM/DD HH:mm:ss'), 
      updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),
    }
    console.log(data)
    await Model['media'].create(data)
    console.log(list[i])
  }
  console.log('xong updated updateMedia !!!!!!!')
  shell.exec(`docker exec -it databases_rediscache_1 redis-cli FLUSHALL && curl --silent https://truyenfullonline.com`)
}

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
switch (myArgs[0]) {
  case 'getNewestStory':
    getStoryDetail('https://truyenyy.vip/truyen/dai-mong-chu/');
    // getNewestStory();
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}

export default {
  getStoryDetail,
  getLinkInCategory,
  getNewestStory,
  getFullStory,
  downimg,
  updateImageForstory,
  updateMedia
}