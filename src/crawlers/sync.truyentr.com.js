import moment from 'moment'

import config from './config'
import saveUrlFile, { imageRandom } from './saveUrlFile'
import * as Model from '../database/models'
import { xoaDau, clearUnicode, convertSlugStory } from '../helpers/common'
import { updateStoryToCategory, updateTotalChapter, itemSyncChapterNewest,removeRefStory } from './sync.common'

const PREFIX_SOURCE = 'truyentr.com'

const getStoryDetail = async (url, storyId=null) => {
  if (!url) {
    url = 'https://truyentr.com/truyen/anh-chang-khong-ket-hon-lay-em-di/'
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
  const totalPage = paginate == 1 ? 1 : (linkPageChapter.match(new RegExp('trang=' + "(.*)" + '')))[1]
  let slugStory = xoaDau(finalChapterArr[4], '-')
  let slugTmp = slugStory
  const listPageChapter = []
  const totalChapter = (totalPage-1)*50+countStoryPageFinal
  const dic = await saveUrlFile(images)

  // random image
  const imageSave = await imageRandom()
  const story = await Model['story'].findOne({
    attributes: ['id','slug', 'crawlerFrom'],
    where: {
      slug: convertSlugStory(slugStory)
    }
  })
  if (story) {
    await Model['chapter'].update({updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'), crawlerFrom: PREFIX_SOURCE}, {where: {storyId: story.id}}) // cập nhật thời gian
  }
  let obj = { name: storyName, slug: slugStory, link: url, source_crawler_1: url, images, imageSave, author, genre, resource, state, rate, shortDescription, paginate, listPageChapter, status: 'on', totalPage, haveChapterContent: 1, crawlerFrom, totalChapter, createdAt: moment().format('YYYY/MM/DD HH:mm:ss'), updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),}
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
    const endpoint = 'https://truyentr.com/truyen/'+slugTmp+'/trang-'+i
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
  console.log('===== Xong getStoryDetail truyentr.com !!!!!!!!!!!!!!: '+url)
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
    const endpoint = 'https://truyentr.com/danh-sach/truyen-moi/trang-'+i;
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
      } else {
        blogtamsu.getStoryDetail(item)
      }
    })
  }
  console.log('xong getNewestStory !!!!!!!!!!!!!!: ')
}

// cập nhật truyện hoàn thành từ truyenfull
const getFullStory = async () => {
  for (let i=4; i>=1; i--) {
    const endpoint = 'https://truyentr.com/danh-sach/truyen-full/trang-'+i;
    let links = null;
    try {
      links = await getLinkInCategory(endpoint)
    } catch (error) {
      console.log('=> error getLinkInCategory:'+endpoint, error)
      continue
    }
    links.map(item => {
      if (item.includes('truyenfull.vn')) {
        getStoryDetail()
      } else if (item.includes('truyentr.com')) {
        truyentr.getStoryDetail()
      } else {
        blogtamsu.getStoryDetail()
      }
    })
  }
  console.log('===== Xong getFullStory truyenfull.com !!!!!!!!!!!!!!: ')
}
export default {
  getStoryDetail,
  getNewestStory
}