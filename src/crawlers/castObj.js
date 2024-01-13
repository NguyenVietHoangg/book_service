import { xoaDau, cleanString } from '../helpers/common'
const castCategoryObj = (obj) => {
  return {
    name: obj.text,
    slug: xoaDau(obj.text),
    source_crawler: obj.link
  }
}

const castStoryObj = (obj) => {
  return {
    name: obj.title,
    slug: xoaDau(obj.title),
    source_crawler_1: obj.link,
    rate: '9.1',
    view: obj.view || null,
    state: obj.state.replace(/Trạng thái: /g, ''),
    author: obj.author.replace(/Tác giả:  /g, '').replace(/Tác giả: /, ''),
    genre: obj.genre ? obj.genre.replace(/Thể loại: /g, '') : null,
    images: obj.image.replace('story//', 'story/'),
    totalPage: obj.totalPage || 0,
    shortDescription: obj.shortDescription || null,
    type: obj.type || null,
    haveChapterContent: obj.haveChapterContent || 0
  }
}

const castChapterObj = (obj) => {
  let chapterOrder = false
  const linkSplit = (obj.link.split('/chuong-'))
  if(linkSplit.length >= 2) {
    chapterOrder = linkSplit[1].replace('/', '').replace('/', '').replace('/', '');
  }
  return {
    name: obj.title,
    slug: xoaDau(obj.title),
    nameUnique: obj.storyTitle.trim() + ' atruyenhay '+obj.title,
    slugUnique: xoaDau(obj.storyTitle.trim() + '-atruyenhay-'+obj.title),
    source_crawler_1: obj.link,
    chapterOrder: chapterOrder ? parseInt(chapterOrder) : null,
    storyId: obj.storyId
  }
}

const castChapterUpdateObj = (obj) => {
  let tet = obj.data ? JSON.stringify(obj.data) : null
  if (!tet || tet.indexOf('xF0') != -1) {
    tet = 'ERROR';
  }
  var re = /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g;
  return {
    // name: obj.title,
    // slug: xoaDau(obj.title),
    // description: obj.data && tet != 'ERROR' ? ((obj.data.map(e => `<p>${e}</p>`)).join('')) : 'ERROR',
    description: obj.data && tet != 'ERROR' ? obj.data.join('<br />') : 'ERROR',
    description2: obj.data ? (JSON.stringify(obj.data)).replace(re, "").replace(/sstruyen/g, 'atruyenhay') : null,
    // chapterId: obj.chapterId
  }
}

export default {
  castCategoryObj,
  castStoryObj,
  castChapterObj,
  castChapterUpdateObj
}