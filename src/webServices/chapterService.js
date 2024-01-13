import _ from 'lodash'
import { Op } from 'sequelize'

import { CHAPTER_LIMIT_ON_PAGE } from '../config/constant'
import * as db from '../database/models'
import * as cache from '../cache'
const cacheTime = 3600

const getChapterDetail = async (slug, pageChapter) => {
  if (!slug){
    return false
  }
  
  if (!pageChapter) {
    pageChapter = 1
  }
  const offset = (pageChapter - 1)*CHAPTER_LIMIT_ON_PAGE

  const keyCache = '__chapter_detail_slug_'+slug+'_page_'+pageChapter+'_offset'+offset
  const cacheData = await cache.get(keyCache, true)
  if (cacheData) {
    return cacheData
  }
  const result = await db.chapter.findOne({
    attributes: ['id', 'storyId', 'name', 'nameUnique', 'slugUnique', 'shortDescription', 'description', 'description2'],
    include: [
      {
        model: db.story,
        as: 'story',
        attributes: ['id', 'name', 'slug', 'author', 'rate', 'state', 'imageSave']
      }
    ],
    where: {
      status: 'on',
      slugUnique: slug
    },
    raw: true
  })
  if (result) {
    result.chapters = await db.chapter.findAndCountAll({
      attributes: ['id', 'storyId', 'name', 'nameUnique', 'slugUnique'],
      where: {
        status: 'on',
        storyId: result.storyId
      },
      limit: CHAPTER_LIMIT_ON_PAGE,
      offset: offset,
      order: [
        ['id', 'asc']
      ],
      raw: true
    })
    result.chapters.pages = Math.ceil(result.chapters.count/CHAPTER_LIMIT_ON_PAGE)
    result.chapters.current = pageChapter

    result.nextChapter = await db.chapter.findOne({
      attributes: ['id', 'slugUnique'],
      where: {
        status: 'on',
        storyId: result.storyId,
        id: {
          [Op.gt]: result.id
        }
      },
      raw: true
    })

    result.prevChapter = await db.chapter.findOne({
      attributes: ['id', 'slugUnique'],
      where: {
        status: 'on',
        storyId: result.storyId,
        id: {
          [Op.lt]: result.id
        }
      },
      raw: true
    })

    cache.set(keyCache, result, cacheTime, true)
    return result
  }
  return false
}

export default {
  getChapterDetail
}