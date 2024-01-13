import moment from 'moment'

import config from './config'
import saveUrlFile, { imageRandom } from './saveUrlFile'
import * as Model from '../database/models'
import { xoaDau, clearUnicode, convertSlugStory } from '../helpers/common'
import { updateStoryToCategory, updateTotalChapter, itemSyncChapterNewest, removeRefStory } from './sync.common'
import truyentr from './sync.truyentr.com'
import blogtamsu from './sync.vi.blogtamsu.com'

//truyện full sẽ redirect qua các trang truyện là truyentr.com, vi.blogtamsu.com

const PREFIX_SOURCE = 'truyenfull.vn'
// lấy thông tin chi tiết của một truyện
const getStoryDetail = async (url=null, storyId=null) => {
  if (!url) {
    url = 'https://truyenfull.vn/anh-boss-xau-xa-trong-loi-don/'
    return;
  }
  await removeRefStory(storyId)
  let selector = null
  try {
    selector = await config.loadCheerio(url)
  } catch (error) {
    console.log('error', error)
    return false
  }
  const result = selector('.col-truyen-main')
  const storyName = clearUnicode(result.find('.col-info-desc h3.title').text())
  const images = result.find('.books .book img').attr('src')
  const author = clearUnicode((selector(result.find('.info div')[0]).text()).replace('Tác giả:', ''))
  const genre = clearUnicode((selector(result.find('.info div')[1]).text()).replace('Thể loại:', ''))
  const resource = clearUnicode((selector(result.find('.info div')[2]).text() + '-'+PREFIX_SOURCE).replace('Nguồn:', '').replace('Trạng thái:', ''))
  const crawlerFrom = PREFIX_SOURCE;
  const state = (selector(result.find('.info div')[3]).text()).replace('Trạng thái:', '')
  const shortDescription = clearUnicode(result.find('.desc-text').html())
  let linktruyentr = result.find('.desc-text a').attr('href')
  if (linktruyentr && linktruyentr.includes('?')) {
    linktruyentr = linktruyentr.split('?')[0]
  }
  let rate = result.find('.desc .rate-holder').attr('data-score')
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
  
  const countStoryPageFinal = (listStoryPageFinal('#list-chapter>.row').find('a')).length
  
  const finalChapterArr = linkPageChapter.split('/')
  const totalPage = paginate == 1 ? 1 : (linkPageChapter.match(new RegExp('/trang-' + "(.*)" + '/')))[1]
  let slugStory = finalChapterArr[3]
  let slugTmp = finalChapterArr[3]
  const listPageChapter = []
  const totalChapter = (totalPage-1)*50+countStoryPageFinal
  const dic = await saveUrlFile(images)

  // random image
  const imageSave = await imageRandom()
  let story = await Model['story'].findOne({
    attributes: ['id','slug', 'crawlerFrom'],
    where: {
      slug: convertSlugStory(slugStory)
    }
  });
  if (story) {
    await Model['chapter'].update({updatedAt: moment().format('YYYY/MM/DD HH:mm:ss')}, {where: {storyId: story.id}}) // cập nhật đi để tạo lại chương
  } else {
    let arrslugStory = slugStory.split('-')
    var pop = arrslugStory.pop()
    if (parseInt(pop)) {
      slugStory = arrslugStory.join('-')
      story = await Model['story'].findOne({
        attributes: ['id','slug', 'crawlerFrom'],
        where: {
          slug: convertSlugStory(slugStory)
        }
      })
      slugStory = slugTmp
    }
  }
  let obj = { name: storyName, slug: convertSlugStory(slugStory), link: url, source_crawler_1: url, images, imageSave, author, genre, resource, state, rate, shortDescription, paginate, listPageChapter, status: 'on', totalPage, haveChapterContent: 1, crawlerFrom, totalChapter, createdAt: moment().format('YYYY/MM/DD HH:mm:ss'), updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),}
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
    const endpoint = 'https://truyenfull.vn/'+slugTmp+'/trang-'+i
    let crawler = null
    try {
      crawler = await config.loadCheerio(endpoint)
    } catch (error) {
      console.log('=> error link in page: '+endpoint, error)
      continue
    }
    
    const listLinks = crawler('#list-chapter>.row').find('a')
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
    selector = await config.loadCheerio(link)
  } catch (error) {
    console.log('=> error crawler chapter: '+link, error)
    return false
  }
  let chapter = selector('#chapter-c.chapter-c').find('br')
  let chapterName = clearUnicode(selector('#chapter-big-container .chapter-title').text())
  let firstDom = selector('#chapter-c.chapter-c').find('br')[0]
  const firstText = firstDom && firstDom.previousSibling && firstDom.previousSibling.nodeValue ? firstDom.previousSibling.nodeValue : ''
  var arr = chapter.map((index, el) => {
    if (el.nextSibling) {
      return el.nextSibling.nodeValue;
    }
  }).get();
  if (arr.length < 3) {
    chapter = selector('#chapter-c.chapter-c').find('p')
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
  return objChapter;
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
    const endpoint = 'https://truyenfull.vn/danh-sach/truyen-moi/trang-'+i;
    let links = null;
    try {
      links = await getLinkInCategory(endpoint)
    } catch (error) {
      console.log('=> error getLinkInCategory:'+endpoint, error)
      continue
    }
    links.map(item => {
      if (item.includes('truyenfull.vn')) {
        getStoryDetail(item)
      } else if (item.includes('truyentr.com')) {
        truyentr.getStoryDetail(item)
      } else if (item.includes('truyentr.org')) {
        truyentr.getStoryDetail(item)
      } else {
        blogtamsu.getStoryDetail(item)
      }
    })
  }
  console.log('xong getNewestStory !!!!!!!!!!!!!!: ')
}

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
switch (myArgs[0]) {
  case '1':
  getNewestStory();
    break;
  case '2':
    getStoryDetail();
    break;
default:
  console.log('Sorry, that is not something I know how to do.');
}

export default {
  getStoryDetail,
  getLinkInCategory,
  getNewestStory,
  getChapter
}