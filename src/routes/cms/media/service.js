import _ from 'lodash'
import { LIMIT } from '../../../config/common'

import * as Model from './../../../database/models'
import * as _e from '../../../config/eResponse'

export const getMediaList = async (conds = [], page = 1, opts = []) => {
  let pager = _.cloneDeep(Model.pager)
  const currentPage = page && page > 0 ? page : 1
  const offset = (page -1) * LIMIT
  const where = {
    name: {
      [Model.Sequelize.Op.like] : conds['keySearch'] ? `%${conds['keySearch']}%` : '%%'
    }
  }
  if (conds.ids && conds.ids.length) {
    where.id = { [Model.Sequelize.Op.in] : conds.ids}
  }
  let { count, rows } = await Model.media.findAndCountAll({
    where,
    offset,
    limit: LIMIT
  })
  rows = rows.map(item => {
    let obj = Model.getMediaSource(item.toJSON())
    item.dataValues.link = obj.link
    item.dataValues.url = obj.link
    return item
  })
  pager = {...pager, ...{ totalPage: Math.ceil(count/LIMIT)}, rows , currentPage}
  return pager
}

export const getMediaDetailById = async (id) => {
  if (!id) {
    return null
  }
  let where = {
    id
  }
  const row = await Model.media.findOne({
    where
  })
  return row
}

export const saveMediaDetailById = async (id, data) => {
  if (!id || id == 'new') {
    // kiêm tra tồn tại của bản ghi nháp
    let item = await Model.media.findOne({
      where: {
        name: {
          [Model.Sequelize.Op.eq]: null
        } 
      }
    })
    if (!item) {
      item = await Model.media.create(Model.setupInsert(data))
    }
    id = item.id
  } else {
    await Model.media.update(Model.setupUpdate(data), {
      where: {id: id}
    })
  }
  return id
}

export default {
  getMediaList,
  getMediaDetailById,
  saveMediaDetailById
}