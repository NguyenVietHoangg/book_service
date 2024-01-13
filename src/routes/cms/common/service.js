import _ from 'lodash'
import { LIMIT } from '../../../config/common'

import * as Model from './../../../database/models'
import * as _e from '../../../config/eResponse'
let modelList = ['category', 'collection', 'tag']

export const getCommonRefs = async (conds = [], page = 1, opts = []) => {
  const offset = (page -1) * LIMIT
  if (opts['modelList']) {
    modelList = opts['modelList']
  }
  const whereList = modelList.map(item => {
    let obj = {
      table: item,
      where: {
        status: 1
      }
    }
    if (conds[`${item}Ids`]) {
      obj.where = {
        $or: [
          {
            id: conds[`${item}Ids`]
          },
          {
            [Model.Sequelize.Op.like]: '%%'
          },
        ],
        status: 1
      }
    }
    return obj
  })
  let data = {}
  for (let i = 0; i < whereList.length; i++) {
    data[whereList[i].table] = await Model[whereList[i].table].findAll({
      where: whereList[i].where,
      offset,
      limit: LIMIT
    })
    data[whereList[i].table] = data[whereList[i].table].map(item => {
      return {id: item.id, name: item.name, label: item.name}
    })
    if (conds['all_select']) {
      data[whereList[i].table].unshift({id: '', name: 'Tất cả', label: 'Tất cả'})
    }
  }
  return data
}

export const postChangeStatus = async (req) => {
  await Model[req.table].update(Model.setupUpdate({status: req.status}), {
    where: {id: req.ids}
  })
  return true
}

export default {
  getCommonRefs,
  postChangeStatus
}