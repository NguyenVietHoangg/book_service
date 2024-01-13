import moment from 'moment'
import { Op, where } from 'sequelize'

import config from './config'
import saveUrlFile, { imageRandom } from './saveUrlFile'
import * as Model from '../database/models'
import { xoaDau, clearUnicode, convertSlugStory, sleep, randomSetTimeout } from '../helpers/common'
import { updateStoryToCategory, updateTotalChapter, itemSyncChapterNewest, removeRefStory, syncChapterNewest } from './sync.common'
import { syncContenRefItem, syncAllContentRef } from '../webServices/syncAllToStory'
import {getUrl} from './settingCrawler'
// import { crawlerToQueueStory, crawlerToQueueChapter } from '../queue'

//truyện full sẽ redirect qua các trang truyện là truyentr.com, vi.blogtamsu.com

const PREFIX_SOURCE = 'sstruyen.com'
const configDomainFrom = process.env.CRAWLER_FROM || 'sstruyen.com'
const hconfigDomainFrom = 'https://'+configDomainFrom
// lấy thông tin chi tiết của một truyện
const getStoryDetail = async (url=null, storyId=null) => {
  if (!url) {
    // url = hconfigDomainFrom+'/sau-khi-dai-lao-ve-huu/'
    url = hconfigDomainFrom+'/truyen-thuyet-muoi-ba-con-giap/'
    return;
  }
  url = getUrl(url);
  console.log('urlxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', url);
  // const finalChapterArrTmp = url.split('/')
  // const slugX= finalChapterArrTmp[3];
  // let storyTmp = await Model['story'].findOne({
  //   attributes: ['id','slug', 'crawlerFrom'],
  //   where: {
  //     slug: convertSlugStory(slugX)
  //   }
  // });
  // if (storyTmp) {
  //   console.log('================= storyTmp '+slugX+' đã tồn tại nên bỏ qua ===========')
  //   return
  // }
  // await removeRefStory(storyId)
  let selector = await config.loadCheerio(url)
  if (!selector) {
    return false
  }
  const result = selector('.story-details .row.wrap-detail.pc')
  const storyName = clearUnicode(result.find('.col-md-8 h1.title').text())
  console.log('storyNamestoryNamestoryNamestoryNamestoryName', storyName)
  const images = ''
  const author = clearUnicode(selector(selector(result).find('.col-md-8 .content1 .info p')[0]).text().replace('Tác giả:', ''))
  const genre = clearUnicode(selector(selector(result).find('.col-md-8 .content1 .info p')[1]).text().replace('Thể loại:', ''))
  const resource = clearUnicode(selector(selector(result).find('.col-md-8 .content1 .info p')[2]).text())
  const crawlerFrom = PREFIX_SOURCE;
  const state = selector(selector(result).find('.col-md-8 .content1 .info p')[3]).text().replace('Trạng thái:', '').trim()
  const shortDescription = (selector(selector(result).find('.col-md-8 .content1>p')).text()).replace(/ +/g, ' ').replace(/sstruyen/g, 'atruyenhay')
  let linktruyentr = result.find('.desc-text a').attr('href')
  if (linktruyentr && linktruyentr.includes('?')) {
    linktruyentr = linktruyentr.split('?')[0]
  }
  let rate = selector(selector(result).find('.col-md-8 .meta .rate')).text()
  rate = 8.9;
  
  // start - lấy tổng số trang
  let totalPage = 1;
  const results = selector('.pagination.pc .nexts').find('a').attr('href')
  var match = (/trang-(.*)\/#s_c_content/gm).exec(results);
  if (match && match[1] && parseInt(match[1]) > 0) {
    totalPage = parseInt(match[1])
  }
  
  const finalChapterArr = url.split('/')
  let slugStory = finalChapterArr[3]
  let slugTmp = finalChapterArr[3]
  const totalChapter = (totalPage)*32

  // random image
  const imageSave = await imageRandom()
  let story = await Model['story'].findOne({
    attributes: ['id','slug', 'crawlerFrom'],
    where: {
      slug: convertSlugStory(slugStory)
    }
  });
  if (story) {
    console.log('================= Đã tồn tại nên bỏ qua ===========')
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
  const slugStoryUnique = convertSlugStory(slugStory);
  const time = moment().format('YYYY/MM/DD HH:mm:ss');
  let obj = { name: storyName, slug: slugStoryUnique, link: url, source_crawler_1: url, images, imageSave, author, genre, resource, state, rate, shortDescription, status: 'on', totalPage, haveChapterContent: 0, crawlerFrom, totalChapter, createdAt: time, updatedAt: time, publishedAt: time}
  let storySave = null;
  try {
    storySave = (!story) ? await Model['story'].create(obj) : story
  } catch (error) {
    console.log('=> error save story:'+url, error)
    return false
  }
  await updateStoryToCategory(storySave.id, obj.genre)
  
  // lặp để lấy link từng trang
  let arrLinks= [];
  let isQueryPage = false
  if (isQueryPage) {
    let startI = 0
    let count = await Model['chapter'].count({
      attributes: ['id'],
      where: {
        storyId: storySave.id
      }
    })
    let order = count
    startI = Math.floor(count/32) || 1;
    for(let i = startI; i <= totalPage; i++) {
      const endpoint = hconfigDomainFrom+'/'+slugTmp+'/trang-'+i
      selector = await config.loadCheerio(endpoint)
      if (!selector) {
        break;
      }
      const checkNewestBlock = selector('.row.list-chap .col-xs-12').length
      let result = selector('.row.list-chap')
      let listLinks = null;
      // nếu có chương mới
      if (checkNewestBlock >=2) {
        result.find('.col-xs-12').slice(1).prevAll().remove(); // xóa phần trước đó
      }
      listLinks =  result.find('.col-sm-6 li a');
      const links = listLinks.map((index, el) => {
        order++
        const linkChapter = selector(el).attr('href')
        const nameChapter = selector(el).text()
        const slugChapter = (linkChapter.split('/'))[2] ? (linkChapter.split('/'))[2] : '';
        const objChapter = {
          storyId: storySave.id,
          name: nameChapter,
          slug: slugChapter,
          slugUnique: slugStoryUnique+ '-atruyenhay-'+slugChapter,
          nameUnique: slugStoryUnique+ '-atruyenhay-'+slugChapter,
          link: linkChapter,
          source_crawler_1: hconfigDomainFrom+''+linkChapter,
          description: '',
          description2: '',
          chapterOrder: order,
          status: 'on',
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'), 
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        return objChapter
      }).get()
      arrLinks = [...arrLinks, ...links]
    }
  } else {
    arrLinks = await getListChapter(slugTmp, storySave.id)
  }
  if (arrLinks.length) {
    await Model.chapter.bulkCreate(arrLinks, { ignoreDuplicates: true })
  }
  // tiến hành lấy lại dữ liệu và cập nhật
  let where = {
    storyId: storySave.id,
    description: ''
  }
  const data = await Model.chapter.findAll({
    attributes: ['id', 'link'],
    where: where,
    raw: true
  });
  if (data.length > 0) {
    // for(let i=0; i<data.length; i++) {
    //   let linkInput = hconfigDomainFrom+''+data[i].link
    //   const chapterObj = await getChapter(linkInput);
    //   if (!chapterObj) {
    //     console.log('========= Cập nhật lỗi chương từ chapterId:'+data[i].id+' == truyen:'+slugStoryUnique+'|'+storySave.id+' === link:'+data[i].link);
    //     break;
    //   }
    //   await Model.chapter.update(chapterObj, {where: { id: data[i].id}});
    //   console.log('========= Hoàn thành cập nhật chapterId:'+data[i].id+' == truyen:'+slugStoryUnique+'|'+storySave.id+' === link:'+data[i].link);
    // }
  }
  // setTimeout(async function() {
  //   await sleep(randomSetTimeout(2))
  //   syncContenRefItem(storySave.id);
  // }, randomSetTimeout(1));
  // await syncContenRefItem(storySave.id);
  // await quetChuongTruyenConTrong(storySave.id)
  //quetChuongTruyenConTrong(storySave.id)
  console.log('xong getStoryDetail !!!!!!!!!!!!!!: storySave.id và '+url)
  return true
}

// lấy dữ liệu của từng chương
const getChapter = async (link) => {
  if (!link) {
    return null;
  } 
  link = getUrl(link);
  let selector = await config.loadCheerio(link)
  if (!selector) {
    return null
  }
  let chapter = selector('.content_wrap1 .container1 p').find('br')
  let firstDom = selector('.content_wrap1 .container1').find('br')[0]
  const firstText = firstDom && firstDom.previousSibling && firstDom.previousSibling.nodeValue ? firstDom.previousSibling.nodeValue : ''
  var arr = chapter.map((index, el) => {
    if (el.nextSibling) {
      return el.nextSibling.nodeValue;
    }
  }).get();
  let arrDescription = [firstText, ...arr]
  if (arrDescription.length === 1 && arrDescription[0] == '') {
    arrDescription = [selector('.content_wrap1 .container1 p').html()]
  }
  const objChapter = {
    description: clearUnicode(arrDescription.join('<br />')),
    description2: clearUnicode(JSON.stringify(arrDescription)),
    status: 'on'
  }
  return objChapter;
}

// lấy toàn bộ link của category
const getCategories = async (id) => {
  let linksDefault = [
    hconfigDomainFrom+'/the-loai/tien-hiep/',
    hconfigDomainFrom+'/the-loai/kiem-hiep/',
    hconfigDomainFrom+'/the-loai/ngon-tinh/',
    hconfigDomainFrom+'/the-loai/khoa-huyen/',
    hconfigDomainFrom+'/the-loai/huyen-huyen/',
    hconfigDomainFrom+'/the-loai/di-gioi/',
    hconfigDomainFrom+'/the-loai/xuyen-khong/',
    hconfigDomainFrom+'/the-loai/trong-sinh/',
    hconfigDomainFrom+'/the-loai/trinh-tham/',
    hconfigDomainFrom+'/the-loai/linh-di/',
    hconfigDomainFrom+'/the-loai/truyen-sac/',
    hconfigDomainFrom+'/the-loai/truyen-nguoc/',
    hconfigDomainFrom+'/the-loai/truyen-sung/',
    hconfigDomainFrom+'/the-loai/cung-dau/',
    hconfigDomainFrom+'/the-loai/truyen-nu-cuong/',
    hconfigDomainFrom+'/the-loai/truyen-gia-dau/',
    hconfigDomainFrom+'/the-loai/dam-my/'
  ];
  if (linksDefault[id]) {
    linksDefault = [linksDefault[id]];
  }
  for(let i = 0; i < linksDefault.length; i++) {
    await getLinkInCategory(linksDefault[i]);
    console.log('======== xong the loai ========: '+linksDefault[i])
    // await sleep(100000);
  }
}

// lấy toàn bộ link category
const getCategoriesFull = async () => {
  let url = hconfigDomainFrom+'/'
  const selector = await config.loadCheerio(url);
  if (!selector) {
    return false;
  }
  const results = selector('.book-category ul').find('a')
  let links = results.map((index, el) => {
    const link = selector(el).attr('href');
    return {index: index, link: link, title: selector(el).attr('title'), slug: link.split('/')[1]}
  }).get()
  for(let i = 0; i < links.length; i++) {
    await getLinkInCategory(links[i]);
    console.log('======== xong the loai getCategoriesFull ========: '+links[i])
  }
  return links
}

// lấy link của thể loại truyện
const getLinkInCategory = async (url=null) => {
  if (!url) {
    url = hconfigDomainFrom+'/the-loai/tien-hiep/'
    return;
  }
  let selector = await config.loadCheerio(url);
  if (!selector) {
    return false;
  }
  // start - lấy tổng số trang
  let totalPage = 1;
  let results = selector('.pagination.pc .nexts').find('a').attr('href')
  let match = (/trang-(.*)/gm).exec(results);
  if (match[1] && parseInt(match[1]) > 0) {
    totalPage = parseInt(match[1])
  }
  // xử lý từng truyện
  let links = [];
  for (let i = totalPage; i > 0; i--) {
    await sleep(randomSetTimeout(1));
    let urlItem = url+'trang-'+i;
    console.log(urlItem)
    selector = await config.loadCheerio(urlItem);
    if (!selector) {
      continue;
    }
    let get  = selector('.book-list .table-list.pc table').find('.info .rv-home-a-title a');
    let linkItems = get.map((index, el) => {
      const link = hconfigDomainFrom+''+selector(el).attr('href');
      return link
    }).get()
    links = [...links, ...linkItems]
    if (links.length > 0) {
      for(let i = 0; i < links.length; i++) {
        // xử lý truyện
        // await crawlerToQueueStory({from: 'wattpad.vn', link: links[i], id: null})
        await getStoryDetail(links[i]);
      }
    }
  }
  console.log(links);
}

// cập nhật truyện mới nhất
const getNewestStory = async (id=null) => {
  let linksDefault = [
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=A1',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=A2',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=A3',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=C1',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=C2',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=C3',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=C7',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=C8',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=D1',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=D2',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=D4',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=D5',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=D6',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=D7',
    hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=D9',
  ];
  if (linksDefault[id]) {
    linksDefault = [linksDefault[id]];
  }
  for(let i = 0; i < linksDefault.length; i++) {
    console.log('======== start Newest story ========: '+linksDefault[i])
    await getLinkNewest(linksDefault[i]);
    console.log('======== xong Newest story ========: '+linksDefault[i])
    // await sleep(100000);
  }
}

// lấy link của thể loại truyện
const getLinkNewest = async (url=null) => {
  if (!url) {
    url = hconfigDomainFrom+'/ajax.php?newest=1&page=1&cate=A1'
    // return;
  }
  let selector = await config.loadCheerio(url);
  if (!selector) {
    return false;
  }
  // start - lấy tổng số trang
  // let totalPage = 1;
  let results = selector('table').find('.name a')
  let links = results.map((index, el) => {
    const link = hconfigDomainFrom+'/'+selector(el).attr('href');
    return link
  }).get()
  if (links.length > 0) {
    for(let i = 0; i < links.length; i++) {
      // xử lý truyện
      // crawlerToQueueStory({from: 'wattpad.vn', link: links[i], id: null})
      await getStoryDetail(links[i]);
    }
  }
}

const updateNewStory = async (limit = 500) => {
  const rows = await Model.story.findAll({
    attributes: ['id', 'source_crawler_1'],
    limit: limit,
    order: [
      ['id', 'desc']
    ]
  })
  for(let i = 0; i < rows.length; i++) {
    console.log('Id ==== '+rows[i].id+'====link=== '+rows[i].source_crawler_1);
    // await crawlerToQueueStory({from: 'wattpad.vn', link: rows[i].source_crawler_1.replace('sstruyen.com', 'wattpad.vn'), id: null})
    await getStoryDetail(rows[i].source_crawler_1.replace('sstruyen.com', 'wattpad.vn'));
  }
}

export const updateImageForstory = async () => {
  const list = await Model['story'].findAll({
    attributes: ['id']
  });
  for(let i=0; i< list.length; i++) {
    const img = await imageRandom()
    const data = {imageSave: img}
    await Model['story'].update(data, {where:{ id: list[i].id}})
  }
  console.log('xong updated updateImageForstory !!!!!!!')
}

export const updateChapterToStory = async () => {
  await syncChapterNewest();
}

export const quetChuongTruyenConTrong = async (storyId=null, page=1) => {
  console.log("============= Bắt đầu quét lấy nội dung chương của page sstruyen "+page)
    let where = {
      [Op.or]: [
        {
          description: ''
        },
        {
          description : {
            [Op.is] : null
          }
        }
      ] 
    }
  if (storyId) {
    where = {
      storyId: storyId,
      description: ''
    }
  }
  const limit = 500;
  const list = await Model['chapter'].findAll({
    attributes: ['id', 'source_crawler_1'],
    where: where,
    limit: limit,
    offset: (page-1)*limit
  })
  if (list.length) {
    for (let i = 0; i < list.length; i++) {
      // await crawlerToQueueChapter({from: 'wattpad.vn', link: list[i].source_crawler_1, id:list[i].id})
      await updateChapter(list[i].source_crawler_1, list[i].id)
    }
  }
  console.log("============= Hoàn thành quét xong quét lấy nội dung chương của sstruyen page "+page)
}

export const updateChapter = async (link, id) => {
  const chapterObj = await getChapter(link);
  if (!chapterObj || !chapterObj.description) {
    console.log('==== không lấy được nội dung chương của '+id+': '+link)
    return false;
  }
  await Model.chapter.update(
    {
      description: chapterObj.description,
      description2: chapterObj.description2
    },
    {
      where: {
        id: id
      }
    }
  )
  console.log('==== Cập nhật xong nội dung chương của '+id+': '+link)
}

export const quetTruyenZero = async () => {
  console.log('==== quetTruyenZero của truyện chưa có chương')
  const list = await Model.story.findAll({
    attributes: ['id', 'source_crawler_1'],
    where: {
      totalChapter: 0
    }
  })
  if (list.length) {
    for (let i=0; i< list.length; i++) {
      // await crawlerToQueueStory({from: 'wattpad.vn', link: list[i].source_crawler_1, id: list[i].id})
      await getStoryDetail(list[i].source_crawler_1, list[i].id)
    }
  }
  console.log('==== quetTruyenZero xong của truyện chưa có chương')
}

const getListChapter = async (slugStoryUnique='truyen-thuyet-muoi-ba-con-giap', storyId=10) => {
  const endpoint = hconfigDomainFrom+'/ajax.php?get_chapt&story_seo='+slugStoryUnique
  console.log('enpoint chapter', endpoint);
  let selector = await config.loadCheerio(endpoint)
  const result = selector('select').find('option')
  const links = result.map((index, el) => {
    const linkChapter = selector(el).val()
    const nameChapter = selector(el).text()
    const slugChapter = linkChapter;
    const arrSlug = slugChapter.split('/')
    const objChapter = {
      storyId: storyId,
      name: nameChapter,
      slug: arrSlug[2],
      slugUnique: slugStoryUnique+ '-atruyenhay-'+arrSlug[2],
      nameUnique: slugStoryUnique+ '-atruyenhay-'+arrSlug[2],
      link: linkChapter,
      source_crawler_1: hconfigDomainFrom+''+linkChapter,
      description: '',
      description2: '',
      chapterOrder: index+1,
      status: 'on',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'), 
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    return objChapter
  }).get()
  console.log('linksxxxxxxxxxxxxxxxxxx', links);
  return links
  // let url = hconfigDomainFrom+'/de-cuu-mon/'
  // let storyId = 15418;
  // let selector = await config.loadCheerio(url)
  // if (!selector) {
  //   return false
  // }
  // // start - lấy tổng số trang
  // let totalPage = 1;
  // const results = selector('.pagination.pc .nexts').find('a').attr('href')
  // var match = (/trang-(.*)\/#s_c_content/gm).exec(results);
  // if (match && match[1] && parseInt(match[1]) > 0) {
  //   totalPage = parseInt(match[1])
  // }
  // // lặp để lấy link từng trang
  // let arrLinks= [];
  // let startI = 0
  // let count = await Model['chapter'].count({
  //   attributes: ['id'],
  //   where: {
  //     storyId: storyId
  //   }
  // })
  // console.log('countcountcount:'+count);
  // startI = Math.floor(count/32) || 1;
  // let startI = 1;
  // let totalPage = 5;
  // let slugTmp = 'de-cuu-mon'
  // let i = 1;
  // // for(let i = startI; i <= totalPage; i++) {
  //   // const endpoint = hconfigDomainFrom+'/'+slugTmp+'/trang-'+i
  //   const endpoint = hconfigDomainFrom+'/ajax.php?get_chapt&story_seo='+slugTmp
  //   console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx', endpoint)
  //   let selector = await config.loadCheerio(endpoint)
  //   if (!selector) {
  //     return;
  //     // break;
  //   }
  //   const result = selector('select').find('option').each((i,op) => {
  //     console.log(selector(op).text(), selector(op).val())
  //   })
  //   return
  //   const checkNewestBlock = selector('.row.list-chap .col-xs-12').length
  //   let result = selector('.row.list-chap')
  //   let listLinks = null;
  //   // nếu có chương mới
  //   if (checkNewestBlock >=2) {
  //     result.find('.col-xs-12').slice(1).prevAll().remove(); // xóa phần trước đó
  //   }
  //   listLinks =  result.find('.col-sm-6 li a');
  //   const links = listLinks.map((index, el) => {
  //     const objChapter = {
  //       source_crawler_1: hconfigDomainFrom+''+linkChapter
  //     }
  //     return objChapter
  //   }).get()
  //   arrLinks = [...arrLinks, ...links]
  //   console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx', links)
  // }
}

const syncAuthor = async () => {
  const list  = await Model.story.findAll({
    attributes: ['id', 'author'],
    raw: true
  })
  let refInsert = []
  for(let i=0; i<list.length; i++) {
    console.log('object1', list[i])
    if (!list[i].author) {
      continue;
    }
    let authorSlug = xoaDau(list[i].author)
    if (!authorSlug) {
      continue;
    }
    let checkAuthor = await Model.author.findOne({
      attributes: ['id'],
      where: {
        slug: authorSlug,
        name: list[i].author
      }
    })
    let authorId = null
    if (!checkAuthor) {
      checkAuthor = await Model.author.findOne({
        attributes: ['id'],
        where: {
          slug: authorSlug
        }
      })
      if (checkAuthor) {
        authorSlug = authorSlug+'-'+makeid(5)
      }
      let author = await Model.author.create({
        name: list[i].author,
        slug: authorSlug
      })
      authorId = author.id
    } else {
      authorId = checkAuthor.id
    }
    console.log('object2', refInsert)
    refInsert.push({
      authorId: authorId,
      storyId: list[i].id
    })
  }
  if (refInsert.length) {
    console.log('object3', refInsert)
    await Model.author_story.bulkCreate(refInsert, { ignoreDuplicates: true })
  }
}

const makeid = (length) => {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const syncAllContentRef1000 = () => {
  syncAllContentRef(1000)
}

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
switch (myArgs[0]) {
  case '2':
    getStoryDetail();
    break;  
  case '3':
    getCategories(myArgs[1]);
    break;
  case '4':
    getLinkInCategory();
    break;
  case '5':
    getNewestStory();
    break;
  case '6':
    updateNewStory();
    break;  
  case '7':
    getLinkNewest();
    break;
  case '8':
    updateImageForstory();
    break;
  case '9':
    updateChapterToStory();
    break;
  case '10':
    quetChuongTruyenConTrong(null, myArgs[1]);
    break;
  case '11':
    quetTruyenZero();
    break;
  case '12':
    getListChapter();
    break;
  case '13':
    syncAuthor();
    break;  
  case '14':
    syncAllContentRef1000();
    break;
default:
  console.log('Sorry, that is not something I know how to do.');
}

export default {
  getStoryDetail,
  getLinkInCategory,
  getCategoriesFull,
  getChapter,
  getNewestStory,
  updateNewStory,
  updateChapter,
  quetChuongTruyenConTrong,
  quetTruyenZero
}