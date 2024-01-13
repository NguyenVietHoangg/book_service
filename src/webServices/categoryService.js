import _ from 'lodash'

import { STORY_LIMIT_ON_PAGE } from '../config/constant'
import { Op } from 'sequelize'
import * as db from '../database/models'
import * as cache from '../cache'
const cacheTime = 3600

const getCategories = async () => {
  const keyCache = '__categories__'
  const cacheData = await cache.get(keyCache, true)
  if (cacheData) {
    return cacheData
  }
  const result = await db.category.findAll({
    attributes: ['id', 'slug', 'name'],
    where: {
      status: 'on'
    },
    raw: true
  })
  
  if (result.length) {
    const categories = await Promise.all(result.map(async (cate) => {
      cate.count = await db.story.count({
        where: {
          genre: {
            [Op.substring]: cate.name,
          },
          haveChapterContent: 1
        },
        order: [
          ['id', 'asc']
        ],
      })
      return cate
    }))
    cache.set(keyCache, categories, cacheTime, true)
    return categories
  }
  return [];
}

const getCategoryDetail = async (slug, storyPage) => {
  if (!slug){
    return false
  }
  if (!storyPage) {
    storyPage = 1
  }
  const offset = (storyPage - 1)*STORY_LIMIT_ON_PAGE

  const keyCache = '__category_detail_slug_'+slug+'_page_'+storyPage+'_offset_'+offset
  const cacheData = await cache.get(keyCache, true)
  if (cacheData) {
    return cacheData
  }

  const result = await db.category.findOne({
    attributes: ['id', 'slug', 'name'],
    where: {
      status: 'on',
      slug: slug
    },
    raw: true
  })
  if (result) {
    result.stories = await db.story.findAndCountAll({
      attributes: ['id', 'name', 'slug', 'genre', 'author', 'resource',  'images', 'imageSave', 'view', 'rate', 'shortDescription', 'state'],
      where: {
        genre: {
          [Op.substring]: result.name,
        },
        haveChapterContent: 1
      },
      limit: STORY_LIMIT_ON_PAGE,
      offset: offset,
      order: [
        ['id', 'asc']
      ],
      raw: true
    })
    result.stories.pages = Math.ceil(result.stories.count/STORY_LIMIT_ON_PAGE)
    result.stories.current = storyPage
    cache.set(keyCache, result, cacheTime, true)
  }
  return result
}

export default {
  getCategories,
  getCategoryDetail
}