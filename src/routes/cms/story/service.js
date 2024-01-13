import _, { isInteger } from 'lodash'
import { LIMIT } from '../../../config/common'
import { genSlug } from '../../../utils/stringHelpers'

import * as Model from './../../../database/models'
import * as _e from '../../../config/eResponse'

export const getStoryList = async (conds = [], page = 1, opts = []) => {
  let pager = _.cloneDeep(Model.pager)
  const currentPage = page && page > 0 ? page : 1
  const offset = !isInteger(page) ? 0 : (page -1) * LIMIT
  let where = {
    name: {
      [Model.Sequelize.Op.like] : conds['keySearch'] ? `%${conds['keySearch']}%` : '%%'
    }
  }
  let include = [{ model: Model.media, as: 'medium' }]
  if (conds['status']) {
    where = {...where, ...{status: conds['status']}}
  }
  if (!where.status) {
    if (conds.tab && conds.tab == '#trash') {
      where.status = 7 // bản ghi đã xóa
    } else {
      where.status = [1,2,3,4,5,6]
    }
  }
  if (conds['categoryId']) {
    include = [...include, ...[{
      model: Model.category_has_story,
      where: {
        categoryId: conds['categoryId']
      },
      required: true
    }]]
  }
  if (conds['collectionId']) {
    include = [...include, ...[{
      model: Model.collection_has_story,
      where: {
        collectionId: conds['collectionId']
      },
      required: true
    }]]
  }
  let { count, rows } = await Model.story.findAndCountAll({
    where,
    include,
    offset,
    limit: LIMIT
  })
  rows = rows.map(item => {
    let obj = Model.getMediaSource(item.toJSON().medium)
    obj.url = obj.link
    item.dataValues.medium = obj
    return item
  })
  pager = {...pager, ...{ totalPage: Math.ceil(count/LIMIT)}, rows , currentPage}
  return pager
}

export const getStoryDetailById = async (id) => {
  if (!id) {
    return null
  }
  let where = {
    id
  }
  const row = await Model.story.findOne({
    where,
    include: [ 
      { model: Model.media },
      { model: Model.category},
      { model: Model.collection},
      { model: Model.tag},
    ]
  })
  if (row.media && row.media.length) {
    row.dataValues.imageListIds = row.media.map(item => item.id)
  }
  if (row.categories && row.categories.length) {
    row.dataValues.categoryIds = row.categories.map(item => item.id)
  }
  if (row.collections && row.collections.length) {
    row.dataValues.collectionIds = row.tags.map(item => item.id)
  }
  if (row.tags && row.tags.length) {
    row.dataValues.tagIds = row.tags.map(item => item.id)
  }
  return row
}

export const saveStoryDetailById = async (id, data) => {
  let item = null
  if (!id || id ==  'new') {
    // kiêm tra tồn tại của bản ghi nháp
    item = await Model.story.findOne({
      where: {
        name: {
          [Model.Sequelize.Op.eq]: null
        } 
      },
    })
    if (!item) {
      item = await Model.story.create(Model.setupInsert({}))
    }
    id = item.id
  } else {
    item = await Model.story.findOne({
      where: {
        id: id 
      },
    })
    if (!item) {
      return null
    }
    item = item.toJSON()
    if (data.isActive) {
      data.status = 1
    }
    data.slug = !data.slug && data.name ? genSlug(data.name, '-', 3) : genSlug(item.slug, '-', null)
    await Model.story.update(Model.setupUpdate(data), {
      where: {id: id}
    })
  }
  // cập nhật lại link ảnh
  if (data.tab && data.tab == 'basic') {
    await Model.media_has_reftable.destroy({
      where: {
        refTableId: id
      }
    })
    if (data.imageListIds && data.imageListIds.length) {
      const images = data.imageListIds.map(item => {
        const obj = Model.setupInsert({
          mediaId: item,
          refTableId: id,
          refTableName: 'story'
        })
        return obj
      })
      Model.media_has_reftable.bulkCreate(images, { ignoreDuplicates: true })
    }
  }
  
  // cập nhật lại liên kết category, collection, tag
  if (data.tab && data.tab == 'ref') {
    const refs = ['category', 'collection', 'tag'];
    for( let i = 0; i < refs.length; i++) {
      let refTable = `${refs[i]}_has_story`
      await Model[refTable].destroy({
        where: {
          storyId: id
        }
      })
      if (data[`${refs[i]}Ids`] && data[`${refs[i]}Ids`].length) {
        let items = data[`${refs[i]}Ids`].map(item => {
          const obj = Model.setupInsert({
            [`${refs[i]}Id`]: item,
            storyId: id,
          })
          return obj
        })
        Model[refTable].bulkCreate(items, { ignoreDuplicates: true })
      }
    }
  }
  return id
}

export default {
  getStoryList,
  getStoryDetailById,
  saveStoryDetailById
}