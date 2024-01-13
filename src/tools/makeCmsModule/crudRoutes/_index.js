import express from 'express'
import * as _e from '../../../config/eResponse'
import { ADD_SUCCESS, UPDATE_SUCCESS, SUCCESS, ERROR, NOT_FOUND } from '../../../config/typeAlias'
import * as sv from './service'
const router = express.Router()
const mainSv = sv._table_generate_
const commonSv = sv.commonSv
/**
 * get pagination list on _table_generate_
 */
router.post(`/_table_generate_/get_table_generate_camel_case_List`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await mainSv.get_table_generate_camel_case_List(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})

/**
 * get _table_generate_ detail by id
 */
 router.get(`/_table_generate_/get_table_generate_camel_case_DetailById/:id`, async (req, res) =>{
  const id = req.params.id
  let data = await mainSv.get_table_generate_DetailById(id)
  if (!data) {
    res.end(_e._errorByHandJSon(NOT_FOUND))
  }
  res.end(_e._successJson('Success', data))
})

/**
 * update _table_generate_ detail by id
 */
 router.post(`/_table_generate_/save_table_generate_camel_case_DetailById/:id`, async (req, res) =>{
  const id = req.params.id
  const data = req.body.data
  data.tab = req.query.tab
  const result = await mainSv.save_table_generate_camel_case_DetailById(id, data)
  if (!result) {
    res.end(_e._errorByHandJSon(ERROR))
  }
  res.end(_e._successJson(id && id != 'new' ? UPDATE_SUCCESS : ADD_SUCCESS, {id: result}))
})

/**
 * change status _table_generate_ by id
 */
router.post(`/_table_generate_/postChangeStatus`, async (req, res) =>{
  const conds = req.body
  const data = await commonSv.postChangeStatus(conds)
  res.end(_e._successJson(SUCCESS, data))
})
export default router