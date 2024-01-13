import _, { isInteger } from 'lodash'
import { LIMIT } from '../../../config/common'
import { genSlug } from '../../../utils/stringHelpers'
import * as Model from '../../../database/models'
import * as _e from '../../../config/eResponse'

export const getCategoryList = async (conds = [], page = 1, opts = []) => {
  let pager = _.cloneDeep(Model.pager)
  const currentPage = page && page > 0 ? page : 1
  const offset = !isInteger(page) ? 0 : (page -1) * LIMIT
  let where = {
    name: {
      [Model.Sequelize.Op.like] : conds['keySearch'] ? `%${conds['keySearch']}%` : '%%'
    }
  }
  let include = [
    { model: Model.media, as: 'medium' },
    { model: Model.category, as: 'children'},
    { model: Model.category, as: 'parent'},
  ]
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
  let { count, rows } = await Model.category.findAndCountAll({
    where,
    include,
    offset,
    limit: LIMIT
  })
  rows = rows.map(item => {
    let obj = Model.getMediaSource(item.toJSON().medium)
    item.dataValues.medium = obj
    return item
  })
  pager = {...pager, ...{ totalPage: Math.ceil(count/LIMIT)}, rows , currentPage}
  return pager
}

export const getCategoryDetailById = async (id) => {
  if (!id) {
    return null
  }
  let where = {
    id
  }
  const row = await Model.category.findOne({
    where,
    include: [ 
      { model: Model.media },
      { model: Model.category, as: 'children'},
      { model: Model.category, as: 'parent'},
    ]
  })
  if (row.categories && row.categories.length) {
    row.dataValues.categoryIds = row.categories.map(item => item.id)
  }
  return row
}

export const getCategoryParentList = async (id) => {
  const detail = await getCategoryDetailById(id)
  const rows = await Model.category.findAll({
    where: {
      parentId: {
        [Model.Sequelize.Op.eq]: null
      },
      id: {
        [Model.Sequelize.Op.not]: id
      },
      updatedAt: {
        [Model.Sequelize.Op.not]: null
      },
      name: {
        [Model.Sequelize.Op.not]: ''
      }
    },
    include: [ 
      { model: Model.media },
      { model: Model.category, as: 'children'},
      { model: Model.category, as: 'parent'},
    ]
  })
  let parentList = rows.map(item => {
    item = item.toJSON()
    item.text = item.name
    if (detail.parentId && item.id == detail.parentId) {
      item.state = { checked: true }
    }
    return item
  })
  return parentList
}

export const saveCategoryDetailById = async (id, data) => {
  let item = null
  if (!id || id ==  'new') {
    // kiêm tra tồn tại của bản ghi nháp
    item = await Model.category.findOne({
      where: {
        name: {
          [Model.Sequelize.Op.eq]: null
        } 
      },
    })
    if (!item) {
      item = await Model.category.create(Model.setupInsert({}))
    }
    id = item.id
  } else {
    item = await Model.category.findOne({
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
    await Model.category.update(Model.setupUpdate(data), {
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
          refTableName: 'category'
        })
        return obj
      })
      Model.media_has_reftable.bulkCreate(images, { ignoreDuplicates: true })
    }
  }
  return id
}

export default {
  getCategoryList,
  getCategoryDetailById,
  getCategoryParentList,
  saveCategoryDetailById
}