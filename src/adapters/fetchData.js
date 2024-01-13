import _ from 'lodash'
import { Op, QueryTypes, sequelize, where } from 'sequelize'
import * as Model from '../database/models'
import { LIMIT, LIMIT_MAX, LIMIT_MIN, ROLE_FULLVIEW, ROLE_LEADER } from '../config/common'
import { flushByUser } from '../cache'
import cons from 'consolidate'
import { xoaDau } from '../helpers/common'

const PAGIN = {
  offset: 0,
  limit: LIMIT
}

const SYNSTAX = {
  offset: PAGIN.offset,
  limit: LIMIT,
  where: { },
  order: [
    ['id', 'desc']
  ],
  distinct:true,
  raw: false
}


const modSynstax = (conds) => {
  let synstax = _.cloneDeepWith(SYNSTAX)
  let firstWhere = {}
  if (global.user) {
    if (ROLE_FULLVIEW.includes(global.user.role)) {
      firstWhere = { }
    } else if (global.user.role === ROLE_LEADER) {
      const users = _.map(global.user.user, 'id')
      firstWhere = { userId: users }
    }
    synstax.where = firstWhere
    console.log('================ first where ===============', firstWhere)
  }
  synstax.where = {...synstax.where, ...conds.where}
  if (conds.attributes) {
    synstax.attributes = conds.attributes;
  }
  console.log('====== conditionQuery Input\n ======', conds)

  synstax.limit = parseInt(conds.limit && conds.limit <= LIMIT_MAX && conds.limit >= LIMIT_MIN ? conds.limit : SYNSTAX.limit)
  synstax.offset = parseInt(conds.offset ? (parseInt(conds.offset)) : SYNSTAX.offset)
  if (synstax.where && synstax.where.keySearch) {   
    synstax.where[Op.or] = [
      {
        name: {
          [Op.like]: (synstax.where.format && synstax.where.format === 'alphabet') ? `${synstax.where.keySearch}%` : `%${synstax.where.keySearch}%`
        }          
      }
    ]    
    delete synstax.where.keySearch    
  } else if (synstax.where && synstax.where.name) {
    synstax.where[Op.or] = [
      {
        name: {
          [Op.like]: (synstax.where.format && synstax.where.format === 'alphabet') ? `${synstax.where.name}%` : `%${synstax.where.name}%`
        }           
      }
    ]
    delete synstax.where.name
    delete synstax.where.format
  } else if (synstax.where && synstax.where.keySearchSlug) {    
    synstax.where ={slug:{[Op.substring]: synstax.where.keySearchSlug}}     
  }
  if (conds.where) {
    const keys = Object.keys(conds.where)
    const values = Object.values(conds.where)
    if (keys.length) {
      for(let i = 0; i < keys; i++) {
        if (keys[i] !== 'name' || keys !== 'keySearch') {
          synstax.where[keys[i]] = values[i]
        }
      }
    }
  }

  synstax.order = conds.order && conds.order.length ? [...conds.order, ...synstax.order] : synstax.order
  synstax.raw = conds.raw || SYNSTAX.raw
  if (conds.include && conds.include.length) {
    let includes = []
    conds.include.forEach((item) => {
      let obj = {
        model: Model[item.name],
        as: item.as
      }
      if (item.attributes) {
        obj.attributes = item.attributes
      }
      if (item.foreignKey) {
        obj.foreignKey = item.foreignKey
      }
      if (item.where) {
        obj.where = item.where
      }
      if (item.limit) {
        obj.limit = item.limit
      }
      if (item.include && _.isArray(item.include)) {
        obj.include = _.map(item.include, (it) => ({model: Model[it.name], as: it.as}))
      }
      obj.required = item.required || false
      includes.push(obj)
    })
    synstax.include = includes
  }

  console.log('================= final query =================\n', synstax)
  return synstax
}

export const fetchAll = (name, conds={}, attributes=[]) => {
  try {
    if (_.isArray(attributes) && attributes.length) {
      return Model[name].findAll({attributes}, modSynstax(conds, name))
    }
    return Model[name].findAll(modSynstax(conds, name))
  } catch (error) {
    // should save log
    console.log(`=== fetchAll error with table : ${name} , ${JSON.stringify(error)}`)
    return error
  }
}

export const findAndCountAll = (name, conds={}, attributes=[]) => {
  try {
    if (_.isArray(attributes) && attributes.length) {
      return Model[name].findAndCountAll({attributes}, modSynstax(conds, name))
    }
    return Model[name].findAndCountAll(modSynstax(conds, name))
  } catch (error) {
    // should save log
    console.log(`=== findAndCountAll error with table : ${name} , ${JSON.stringify(error)}`)
    return error
  }
}


export const fetchOne = (name, conds={}, attributes=[]) => {
  try {
    if (_.isArray(attributes) && attributes.length) {
      return Model[name].findAll({attributes}, {...modSynstax(conds, name), ...{limit: 1}})
    }
    return Model[name].findAll({...modSynstax(conds, name), ...{limit: 1}})
  } catch (error) {
    // should save log
    console.log(`=== fetchOne error with table : ${name} , ${JSON.stringify(error)}`)
    return error
  }
}

export const fetchOneToObject = (name, conds={}, attributes=[]) => {
  try {
    if (_.isArray(attributes) && attributes.length) {
      return Model[name].findAll({attributes}, {...modSynstax(conds, name), ...{limit: 1}})
    }
    return Model[name].findOne({...modSynstax(conds, name), ...{limit: 1}})
  } catch (error) {
    // should save log
    console.log(`=== fetchOneToObject error with table : ${name} , ${JSON.stringify(error)}`)
    return error
  }
}

export const countAll = (name, conds={}) => {
  try {
    return Model[name].count(modSynstax(conds, name))
  } catch (error) {
    // should save log
    console.log(`=== countAll error with table : ${name} , ${JSON.stringify(error)}`)
    return error
  }
}

export const createRow = (name, data, config={}) => {
  try {
    if (_.isEmpty(data, true)) {
      return false
    }
    flushByUser()
    return Model[name].create(data, config)
  } catch (error) {
    console.log(`=== createRow error with table : ${name} , ${JSON.stringify(error)}`, JSON.stringify(data))
    return error
  }
}

export const updateRow = (name, conds, data, config={}) => {
  try {
    if (_.isEmpty(data, true)) {
      return false
    }
    if (_.isEmpty(data, true)) {
      return false
    }
    flushByUser()
    return Model[name].update(data, conds, config)
  } catch (error) {
    console.log(`=== updateRow error with table : ${name} , ${JSON.stringify(error)}`, JSON.stringify(data))
    return error
  }
}

export const removeRow = (name, conds) => {
  try {
    if (_.isEmpty(conds, true)) {
      return false
    }
    flushByUser()
    return Model[name].destroy(conds)
  } catch (error) {
    console.log(`=== removeRow error with table : ${name} , ${JSON.stringify(error)}`, JSON.stringify(data))
    return error
  }
}

export const bulkCreate = (name, data, config={}) => {
  try {
    if (_.isEmpty(data, true)) {
      return false
    }
    flushByUser()
    return Model[name].bulkCreate(data, {...{ ignoreDuplicates: true }, ...config})
  } catch (error) {
    console.log(`=== bulkCreate error with table : ${name} , ${JSON.stringify(error)}`, JSON.stringify(data))
    return error
  }
}

export const pipeTransaction = async (name, data) => {
  try {
    return await Model.sequelize.transaction()
  } catch (error) {
    console.log(`=== pipeTransaction error with table : ${name} , ${JSON.stringify(error)}`)
    return error
  }
}


export const runSQL = async (sql, config = {}) => {
  try {
    // return await Model.sequelize.query(sql, { type: QueryTypes.SELECT });
    return await Model.sequelize.query(sql);
  } catch (error) {
    console.log(`=== runSQL error with table : ${JSON.stringify(error)}`)
    return error
  }
}