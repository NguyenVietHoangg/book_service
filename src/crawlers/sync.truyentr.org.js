import moment from 'moment'

import config from './config'
import { imageRandom } from './saveUrlFile'
import * as Model from '../database/models'
import { xoaDau, clearUnicode, convertSlugStory } from '../helpers/common'
import { updateStoryToCategory, updateTotalChapter, itemSyncChapterNewest, removeRefStory } from './sync.common'

const PREFIX_SOURCE = 'truyentr.org'

const getStoryDetail = async (url, storyId=null) => {
  if (!url) {
    url = 'https://truyentr.org/truyen/ngoanh-lai-ta-yeu-nhau/'
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
  const result = selector('.col-main-content')
  const storyName = clearUnicode(result.find('.book-head h1.title a').text())
  const images = result.find('.sstbcover').attr('src')
  const author = clearUnicode((selector(result.find('.info p')[0]).text()).replace('Tác giả:', ''))
  const genre = clearUnicode((selector(result.find('.info p')[1]).text()).replace('Thể loại:', ''))
  const resource = clearUnicode((selector(result.find('.info p')[2]).text() + '-'+PREFIX_SOURCE).replace('Nguồn:', '').replace('Trạng thái:', ''))
  const crawlerFrom = PREFIX_SOURCE;
  const state = (selector(result.find('.info div')[3]).text()).replace('Trạng thái:', '')
  let shortDescription = clearUnicode(result.find('.book-desc').html())
  let rate = 9.1
  const paginate = result.find('.pagination.pc .pagination.pagination-sm a').length ? result.find('.pagination.pc .pagination.pagination-sm a').length : 1;
  const textfinalPaginate = selector(result.find('.pagination.pagination-sm a')[paginate-1]).text();
  let linkPageChapter = null;
  if (textfinalPaginate.includes(' » ')) {
    linkPageChapter = selector(result.find('.pagination.pc .pagination.pagination-sm a')[paginate-1]).attr('href')
  } else if (textfinalPaginate.includes(' › ')){
    linkPageChapter = selector(result.find('.pagination.pc .pagination.pagination-sm a')[paginate-1]).attr('href')
  }
  let listStoryPageFinal = null
  try {
    listStoryPageFinal = await config.loadCheerio(linkPageChapter)
  } catch (error) {
    console.log('=> error listStoryPageFinal:'+linkPageChapter, error)
    return false
  }
  
  const countStoryPageFinal = listStoryPageFinal('.list-chapters li a').length
  
  let totalPage = 1
  if (linkPageChapter) {
    var splitPage = linkPageChapter.split('?trang=')
    totalPage = parseInt(splitPage[1])
  }
  let slugStory = xoaDau((url.split('/'))[4], '-')
  let slugTmp = slugStory
  const listPageChapter = []
  const totalChapter = (totalPage-1)*50+countStoryPageFinal

  // random image
  const imageSave = await imageRandom()
  const story = await Model['story'].findOne({
    attributes: ['id','slug', 'crawlerFrom', 'totalPage'],
    where: {
      slug: convertSlugStory(slugStory)
    }
  })
  if (story) {
    await Model['chapter'].update({updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'), crawlerFrom: PREFIX_SOURCE}, {where: {storyId: story.id}}) // cập nhật đi để tạo lại chương
  }
  let obj = { name: storyName, slug: slugStory, link: url, source_crawler_1: url, images, imageSave, author, genre, resource, state, rate, shortDescription, paginate, listPageChapter, status: 'on', totalPage, haveChapterContent: 1, crawlerFrom:crawlerFrom, totalChapter, createdAt: moment().format('YYYY/MM/DD HH:mm:ss'), updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),}
  console.log(obj);
  let storySave = null;
  try {
    storySave = (!story) ? await Model['story'].create(obj) : story
  } catch (error) {
    console.log('=> error save story:'+url, error)
    return false
  }
  await updateStoryToCategory(storySave.id, obj.genre);
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
    const endpoint = 'https://truyentr.org/truyen/'+slugTmp+'/?trang='+i
    console.log(endpoint);
    let crawler = null
    try {
      crawler = await config.loadCheerio(endpoint)
    } catch (error) {
      console.log('=> error link in page: '+endpoint, error)
      continue
    }
    
    const listLinks = crawler('.list-chapters').find('a')
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
  console.log('===== Xong getStoryDetail truyentr.com !!!!!!!!!!!!!!: '+url)
  return true
}

// lấy link của thể loại truyện
const getLinkInCategory = async (link=null) => {
  const selector = await config.loadCheerio(link)
  const result = selector('.col-main-content .truyen-title').find('a')
  const links = result.map((index, el) => {
    return selector(el).attr('href')
  }).get()
  return links.reverse()
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
  let chapter = selector('.content.container1.chapter-c').find('br')
  let chapterName = clearUnicode((selector('.active.rv-author-a').text()) +': '+ selector('.rv-full-story-title h1.rv-full-story-title').text())
  let firstDom = selector('.content.container1.chapter-c').find('br')[0]
  const firstText = firstDom && firstDom.previousSibling && firstDom.previousSibling.nodeValue ? firstDom.previousSibling.nodeValue : ''
  var arr = chapter.map((index, el) => {
    if (el.nextSibling) {
      return el.nextSibling.nodeValue;
    }
  }).get();
  if (arr.length < 3) {
    chapter = selector('.content.container1.chapter-c').find('p')
    arr = chapter.map((index, el) => {
      return selector(el).text()
    }).get();
  }
  const arrDescription = [firstText, ...arr]
  const objChapter = {
    storyId: storyId,
    name: chapterName,
    slug: xoaDau(chapterName),
    slugUnique: xoaDau(slugStory+ '-atruyenhay-'+chapterName),
    nameUnique: slugStory+ '-atruyenhay-'+chapterName,
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

// cập nhật truyện mới từ truyện full
const getNewestStory = async () => {
  for (let i=1; i>=1; i--) {
    const endpoint = 'https://truyentr.org/danh-sach/truyen-moi/?page='+i;
    let links = null;
    try {
      links = await getLinkInCategory(endpoint)
    } catch (error) {
      console.log('=> error getLinkInCategory:'+endpoint, error)
      continue
    }
    console.log(links);
    links.map(item => {
      if (item.includes('truyentr.org')) {
        getStoryDetail(item)
      } else if (item.includes('truyentr.com')) {
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
  case 'getNewestStory':
    getStoryDetail();
    // getNewestStory();
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}

export default {
  getStoryDetail,
  getNewestStory
}