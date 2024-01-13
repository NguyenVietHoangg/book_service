import moment from 'moment'
import axios from 'axios'
import cheerio from 'cheerio'

import config from './config'
import { imageRandom } from './saveUrlFile'
import * as Model from '../database/models'
import { xoaDau, clearUnicode, convertSlugStory } from '../helpers/common'
import { updateStoryToCategory, updateTotalChapter, itemSyncChapterNewest, removeRefStory } from './sync.common'

const PREFIX_SOURCE = 'truyenhay.com'
// lấy thông tin chi tiết của một truyện
const getStoryDetail = async (url, storyId=null) => {
  if (!url) {
    url = 'https://truyenhay.com/vuong-phi-da-tai-da-nghe-4'
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
  const result = selector('#content')
  const storyName = clearUnicode(result.find('.comic-title').text())
  const images = result.find('.book img').attr('src')
  const author = clearUnicode((selector(result.find('.info .meta li')[0]).text()).replace('Tác giả:', ''))
  const genre = clearUnicode((selector(result.find('.info .meta li')[1]).text()).replace('Thể loại:', ''))
  const resource = clearUnicode((selector(result.find('.info .meta li')[2]).text() + '-'+PREFIX_SOURCE).replace('Nguồn:', '').replace('Trạng thái:', ''))
  const crawlerFrom = PREFIX_SOURCE;
  const state = (selector(result.find('.info .meta li')[3]).text()).replace('Trạng thái:', '')
  let shortDescription = clearUnicode(result.find('.short-desc').html()).replace('truyenhay.com', 'truyenfullonline.com')
  let rate = 9.2
  rate = parseFloat(rate)
  const paginate = result.find('.pagination.pagination-sm a').length ? result.find('.pagination.pagination-sm a').length : 1;
  const textfinalPaginate = selector(result.find('.pagination.pagination-sm a')[paginate-1]).text();
  const linkPageChapter = paginate===1?url:(!textfinalPaginate.includes('Cuối')) ? selector(result.find('.pagination.pagination-sm a')[paginate-2]).attr('href') : selector(result.find('.pagination.pagination-sm a')[paginate-1]).attr('href')
  let listStoryPageFinal = null
  try {
    listStoryPageFinal = await config.loadCheerio(linkPageChapter)
  } catch (error) {
    console.log('=> error listStoryPageFinal:'+linkPageChapter, error)
    return false
  }
  let descriptionStr = selector('.short-desc').find('br')
  var arr = descriptionStr.map((index, el) => {
    if (el.nextSibling) {
      return el.nextSibling.nodeValue;
    }
  }).get()
  shortDescription = arr.join('<br />')
  
  const countStoryPageFinal = parseInt(listStoryPageFinal('#list-chap .pagination').find('a').last().text())
  const finalChapterArr = linkPageChapter.split('/')
  const totalPage = countStoryPageFinal
  let slugStory = finalChapterArr[3]
  let slugTmp = finalChapterArr[3]
  const listPageChapter = []
  const totalChapter = (totalPage-1)*50+countStoryPageFinal
  // const dic = await saveUrlFile(images)

  // random image
  const imageSave = await imageRandom()
  const story = await Model['story'].findOne({
    attributes: ['id','slug', 'crawlerFrom'],
    where: {
      slug: convertSlugStory(slugStory)
    }
  })
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
  // lấy link chương
  let order = 0
  let arrLinks= []
  let startI = 0
  let {count} = await Model['chapter'].findAndCountAll({
    attributes: ['id'],
    where: {
      storyId: storySave.id
    },
    limit:1
  })
  startI = Math.floor(count/50) || 1;
  for(let i = startI; i <= totalPage; i++) {
    const endpoint = 'https://truyenhay.com/'+slugTmp+'?page-'+i
    let crawler = null
    try {
      crawler = await config.loadCheerio(endpoint)
      crawler = await axios.get(endpoint);
      crawler = cheerio.load(crawler.data)
    } catch (error) {
      console.log('=> error link in page: '+endpoint, error)
      continue
    }
    
    const listLinks = crawler('#list-chap .list-item').find('a')
    const links = listLinks.map((index, el) => {
      order++
      const linkChapter = crawler(el).attr('href')
      return { linkChapter, order }
    }).get()
    arrLinks = [...arrLinks, ...links]
  }
  if (!arrLinks.length) {
    console.log('khong co chuong nao')
  } else {
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
  }
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
  let chapterName = clearUnicode(selector('.comic-title').text())
  console.log('chapterName', chapterName)
  let firstDom = selector('.chap-detail').find('br')[0]
  const firstText = firstDom && firstDom.previousSibling && firstDom.previousSibling.nodeValue ? firstDom.previousSibling.nodeValue : ''
  var arr = chapter.map((index, el) => {
    if (el.nextSibling) {
      return el.nextSibling.nodeValue;
    }
  }).get();
  if (arr.length < 3) {
    chapter = selector('#chap-detail').find('p')
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
  const result = selector('#content .list-stores .col-xs-7.infor').find('a')
  const links = result.map((index, el) => {
    return selector(el).attr('href')
  }).get()
  return links.reverse()
}

// cập nhật truyện mới từ truyện full
const getNewestStory = async () => {
  for (let i=3; i>=1; i--) {
    const endpoint = 'https://truyenhay.com/danh-sach/truyen-moi?page='+i;
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

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
switch (myArgs[0]) {
  case 'getNewestStory':
    getNewestStory();
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}

export default {
  getStoryDetail,
  getLinkInCategory,
  getNewestStory
}