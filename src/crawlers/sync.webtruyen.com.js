import moment from 'moment'
import axios from 'axios'
import cheerio from 'cheerio'

import config from './config'
import { addLogo, imageRandom, listImagesOptimize,  } from './saveUrlFile'
import * as Model from '../database/models'
import { xoaDau, clearUnicode, convertSlugStory } from '../helpers/common'
import { updateStoryToCategory, updateTotalChapter, itemSyncChapterNewest, removeRefStory } from './sync.common'

const PREFIX_SOURCE = 'webtruyen.com'
// lấy thông tin chi tiết của một truyện
const getStoryDetail = async (url, storyId=null) => {
  if (!url) {
    url = 'https://dtruyen.com/ma-ngan/'
    return;
  }
  await removeRefStory(storyId)
  let selector = null
  try {
    selector = await axios.get(url);
    selector = cheerio.load(selector.data)
  } catch (error) {
    console.log('error', error)
    return false
  }
  const result = selector('.main-col')
  const storyName = clearUnicode(result.find('.col2 .title').text())
  const images = result.find('.col1 .thumb img').attr('src')
  const author = clearUnicode((selector(result.find('.col1 .author span')[0]).text()).replace('Tác giả:', ''))
  const genre = clearUnicode((selector(result.find('.col1 .story_categories')[0]).text()).replace('Thể loại:', ''))
  const resource = clearUnicode((selector(result.find('.info .meta li')[2]).text() + '-'+PREFIX_SOURCE).replace('Nguồn:', '').replace('Trạng thái:', ''))
  const crawlerFrom = PREFIX_SOURCE;
  let state = clearUnicode((selector(result.find('.col1 .infos p')[4]).text()).replace('Thể loại:', ''))
  let shortDescription = clearUnicode(result.find('.col2 .description').html()).replace('truyenhay.com', 'truyenfullonline.com')
  const linkTruyentt = result.find('.desc-text a').attr('href')
  let rate = clearUnicode(result.find('.col2 .rate .small strong span').text())
  rate = rate ? 8.7 : parseFloat(rate, 1)
  const paginate = result.find('.pagination-control .pagination a').length ? result.find('.pagination-control .pagination a').length : 1
  // console.log('paginate', paginate); return
  const textfinalPaginate = selector(result.find('.pagination-control .pagination a')[paginate-2]).text();
  const linkPageChapter = selector(result.find('.pagination-control .pagination a')[paginate-2]).attr('href')
  let listStoryPageFinal = null
  try {
    selector = await axios.get(linkPageChapter);
    listStoryPageFinal = cheerio.load(selector.data)
  } catch (error) {
    console.log('=> error listStoryPageFinal:'+linkPageChapter, error)
    return false
  }
  const countStoryPageFinal = parseInt(listStoryPageFinal('#chapters .chapters').find('a').length)
  const finalChapterArr = linkPageChapter.split('/')
  const totalPage = finalChapterArr[4]
  let slugStory = finalChapterArr[3]
  let slugTmp = finalChapterArr[3]
  const listPageChapter = []
  const totalChapter = (totalPage-1)*30+countStoryPageFinal

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
  let obj = { name: storyName, slug: convertSlugStory(slugStory), link: url, source_crawler_1: url, images, imageSave, author, genre, resource, state, rate, shortDescription, paginate, listPageChapter, status: 'on', totalPage, haveChapterContent: 1, crawlerFrom, totalChapter, createdAt: moment().format('YYYY/MM/DD HH:mm:ss'), updatedAt: moment().format('YYYY/MM/DD HH:mm:ss')}
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
  
  // lặp để lấy link từng trang
  let order = 0
  let arrLinks= [];
  let {count} = await Model['chapter'].findAndCountAll({
    attributes: ['id'],
    where: {
      storyId: storySave.id
    },
    limit:1
  })
  let startI = Math.floor(count/30) || 1;
  for(let i = startI; i <= totalPage; i++) {
    let chapternext = i==1 ? '' : i;
    const endpoint = 'https://webtruyen.com/'+slugTmp+'/'+chapternext
    let crawler = null
    try {
      crawler = await config.loadCheerio(endpoint)
      crawler = await axios.get(endpoint);
      crawler = cheerio.load(crawler.data)
    } catch (error) {
      console.log('=> error link in page: '+endpoint, error)
      continue
    }
    const listLinks = crawler('#chapters .chapters').find('a')
    const links = listLinks.map((index, el) => {
      order++
      const linkChapter = crawler(el).attr('href')
      return { linkChapter, order }
    }).get()
    arrLinks = [...arrLinks, ...links]
  }

  let chapters = []
  let step = 50
  for (let i = 0; i < arrLinks.length; i++) {
    console.log('arrLinks['+i+'].linkChapter', arrLinks[i].linkChapter)
    const chapterObj = await getChapter(arrLinks[i].linkChapter, storySave.id, convertSlugStory(slugStory), arrLinks[i].order)
    if (chapterObj) {
      chapters.push(chapterObj);
    }
    if (chapters.length === step || i === arrLinks.length - 1) {
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
    selector = await axios.get(link);
    selector = cheerio.load(selector.data)
  } catch (error) {
    console.log('=> error crawler chapter: '+link, error)
    return false
  }
  let chapter = selector('.chap-detail').find('br')
  let chapterName = (clearUnicode(selector('#chapter .chapter-title').text())).trim(':')
  let firstDom = selector('.chap-detail').find('br')[0]
  const firstText = firstDom && firstDom.previousSibling && firstDom.previousSibling.nodeValue ? firstDom.previousSibling.nodeValue : ''
  var arr = chapter.map((index, el) => {
    if (el.nextSibling) {
      return el.nextSibling.nodeValue;
    }
  }).get();
  if (arr.length < 3) {
    chapter = selector('#chapter-content').find('p')
    arr = chapter.map((index, el) => {
      return selector(el).text()
    }).get();
  }
  const arrDescription = [firstText, ...arr]
  const objChapter = {
    storyId: storyId,
    name: chapterName,
    slug: xoaDau(chapterName),
    slugUnique: slugStory+ '-atruyenhay-'+xoaDau(chapterName),
    nameUnique: slugStory+ '-atruyenhay-'+xoaDau(chapterName),
    link: link,
    source_crawler_1: link,
    description: clearUnicode(arrDescription.join('<br />')),
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
    const endpoint = 'https://truyenhay.com/danh-sach/truyen-moi/trang-'+i;
    let links = null;
    try {
      links = await getLinkInCategory(endpoint)
    } catch (error) {
      console.log('=> error getLinkInCategory:'+endpoint, error)
      continue
    }
    
    for (let j= 0; j < links.length; j++) {
      await getStoryDetail(links[j])
    }
  }
  console.log('xong getNewestStory !!!!!!!!!!!!!!: ')
}

// cập nhật truyện hoàn thành từ truyenfull
const getFullStory = async () => {
  for (let i=4; i>=1; i--) {
    const endpoint = 'https://truyenhay.com/danh-sach/truyen-full/trang-'+i;
    let links = null;
    try {
      links = await getLinkInCategory(endpoint)
    } catch (error) {
      console.log('=> error getLinkInCategory:'+endpoint, error)
      continue
    }
    for (let j= 0; j < links.length; j++) {
      await getStoryDetail(links[j])
    }
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
}

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
switch (myArgs[0]) {
case 'getNewestStory':
  // getNewestStory();
  getStoryDetail();
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