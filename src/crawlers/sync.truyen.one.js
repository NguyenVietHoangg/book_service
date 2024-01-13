import axios from 'axios'
import qs from 'qs'
import cheerio from 'cheerio'
import moment from 'moment'

import config from './config'
import { imageRandom} from './saveUrlFile'
import * as Model from './../database/models'
import { xoaDau, clearUnicode, convertSlugStory } from '../helpers/common'
import { updateStoryToCategory, updateTotalChapter, itemSyncChapterNewest, removeRefStory } from './sync.common'

const PREFIX_SOURCE = 'truyen.one'
// lấy thông tin chi tiết của story
const getStoryDetail = async (url, storyId=null) => {
  if (!url) {
    url = 'https://truyen.one/ngon-tinh/truyen-thay-chi-lay-chong'
    return;
  }
  await removeRefStory(storyId)
  let selector = false
  try {
    selector = await config.loadCheerio(url)
  } catch (error) {
    // console.log('error', error)
    return false
  }
  const result = selector('#wrap')
  const storyName = result.find('.col-info-desc h3.title').text()
  const images = result.find('.books .book img').attr('src')
  const author = (selector(result.find('.info div')[0]).text()).replace('Tác giả:', '')
  const genre = (selector(result.find('.info div')[1]).text()).replace('Thể loại:', '')
  const resource = (selector(result.find('.info div')[2]).text() + '-'+PREFIX_SOURCE).replace('Nguồn:', '')
  const crawlerFrom = PREFIX_SOURCE;
  const state = (selector(result.find('.info div')[3]).text()).replace('Trạng thái:', '')
  const shortDescription = result.find('.desc-text.desc-text-full').text()
  const rate = result.find('.desc .rate-holder').attr('data-score')
  const paginate = result.find('.pagination.pagination-sm a').length ? result.find('.pagination.pagination-sm a').length : 1;
  const textfinalPaginate = selector(result.find('.pagination.pagination-sm a')[paginate-1]).text();
  const linkPageChapter = paginate===1?url:(!textfinalPaginate.includes('Cuối')) ? selector(result.find('.pagination.pagination-sm a')[paginate-2]).attr('href') : selector(result.find('.pagination.pagination-sm a')[paginate-1]).attr('href')
  const finalChapterArr = linkPageChapter.split('/')
  const totalPage = paginate == 1 ? 1 : finalChapterArr[finalChapterArr.length - 2]
  const linkPageAjax = 'https://truyen.one/wp-admin/admin-ajax.php'
  const storyIdCrawler = result.find('#id_post').val()

  let listStoryPageFinal = null
  try {
    listStoryPageFinal = await config.loadCheerio(linkPageChapter)
  } catch (error) {
    console.log('=> error listStoryPageFinal:'+linkPageChapter, error)
    return false
  }
  const countStoryPageFinal = (listStoryPageFinal('.list-chapter').find('a')).length
  const totalChapter = (totalPage-1)*50+countStoryPageFinal
  
  const slugStory = xoaDau(storyName, '-')
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
  let obj = { name: storyName, slug: convertSlugStory(slugStory), link: url, source_crawler_1: url, images, imageSave, author, genre, resource, state, rate : (rate || rate < 8.0 ? rate : 8.0), shortDescription, paginate, listPageChapter: null, status: 'on', totalPage, haveChapterContent: 1, crawlerFrom, totalChapter: totalChapter, createdAt: moment().format('YYYY/MM/DD HH:mm:ss'), updatedAt: moment().format('YYYY/MM/DD HH:mm:ss'),}
  let storySave = null;
  try {
    storySave = (!story) ? await Model['story'].create(obj) : story
  } catch (error) {
    console.log('=> error save story:'+url, error)
    return false
  }
  await updateStoryToCategory(storySave.id, obj.genre)

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
  startI = Math.floor(count/100) || 1;
  for (let i=startI; i<=totalPage; i++) {
    var datax = {
      action: 'tw_ajax',
      type: 'pagination',
      id: storyIdCrawler,
      page: i
    };
    var htmlpage = await axios.post( linkPageAjax, qs.stringify( datax ) );
    var selectorChapter = cheerio.load(htmlpage.data.list_chap, { decodeEntities: false });
    const listLinks = selectorChapter('.col-xs-12').find('a');
    const links = listLinks.map((index, el) => {
      order++
      const linkChapter = selectorChapter(el).attr('href')
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
  var x = (selector('head').find('meta[property="og:title"]').attr('content')).split('-')
  let chapterName = x[0]
  let chapter = selector('.chapter_content').find('p')
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
    description: clearUnicode(arrDescription.join('<br />')).replace('truyen.one', 'truyenfullonline.com'),
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
  const result = selector('.list.list-thumbnail.col-xs-12').find('a')
  const links = result.map((index, el) => {
    return selector(el).attr('href')
  }).get()
  return links.reverse()
}

// cập nhật truyện mới từ truyện full
const getNewestStory = async () => {
  for (let i=3; i>=1; i--) {
    let endpoint = 'https://truyen.one/truyen/tat-ca/page/'+i;
    if (i === 1) {
      endpoint = 'https://truyen.one/truyen/tat-ca/';
    }
    let links = null;
    try {
      links = await getLinkInCategory(endpoint)
    } catch (error) {
      console.log('=> error getLinkInCategory:'+endpoint, error)
      continue
    }
    console.log(links);
    links.map(item => {
      if (item.includes('truyen.one')) {
        getStoryDetail(item)
      }
    })
  }
  console.log('xong getNewestStory !!!!!!!!!!!!!!: ')
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
  getNewestStory
}