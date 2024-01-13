import _, { isInteger } from 'lodash'
import { LIMIT } from '../../../config/common'
import { genSlug } from '../../../utils/stringHelpers'
import * as Model from '../../../database/models'
import * as _e from '../../../config/eResponse'
const { Op } = Model.sequelize

export const getundefinedList = async (conds = [], page = 1, opts = []) => {
  let pager = _.cloneDeep(Model.pager)
  const currentPage = page && page > 0 ? page : 1
  const offset = !isInteger(page) ? 0 : (page -1) * LIMIT
  let where = {

    name: {
      [Op.like] : conds['keySearch'] ? `%${conds['keySearch']}%` : '%%'
    }
  }
  let include = [
    /**
     * include example width format
     * { model: Model.media, as: 'medium' }
     */
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
  let { count, rows } = await Model.book.findAndCountAll({
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

export const getundefinedDetailById = async (id) => {
  if (!id) {
    return null
  }
  let where = {
    id
  }
  const row = await Model.book.findOne({
    where,
    include: [
      /**
       * include example width format
       * { model: Model.media, as: 'medium' }
       */
    ]
  })
  if (rowbook && row.book.length) {
    row.dataValues.book.Ids = row.book.map(item => item.id)
  }
  return row
}

export const saveundefinedDetailById = async (id, data) => {
  let item = null
  if (!id || id ==  'new') {
    // kiêm tra tồn tại của bản ghi nháp
    item = await Model.book.findOne({
      where: {
        name: {
          [Op.eq]: null
        }
      },
    })
    if (!item) {
      item = await Model.book.create(Model.setupInsert({}))
    }
    id = item.id
  } else {
    item = await Model.book.findOne({
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
    await Model.book.update(Model.setupUpdate(data), {
      where: {id: id}
    })
  }
  // cập nhật lại link ảnh
  if (data.imageListIds) {
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
          refTableName: `book`
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
  saveCategoryDetailById
}