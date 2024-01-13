import express from 'express'
import * as _e from '../../../config/eResponse'
import { ADD_SUCCESS, UPDATE_SUCCESS, SUCCESS, ERROR, NOT_FOUND } from '../../../config/typeAlias'
import * as sv from './service'
const router = express.Router()
const _generate_camel_case_Sv = sv.testx2
const CommonSv = sv.commonSv
/**
 * get pagination list on testx2
 */
router.post(`/testx2/getundefinedList`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await _generate_camel_case_Sv.getundefinedList(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})

/**
 * get testx2 detail by id
 */
 router.get(`/testx2/getundefinedDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  let data = await _generate_camel_case_Sv.gettestx2DetailById(id)
  if (!data) {
    res.end(_e._errorByHandJSon(NOT_FOUND))
  }
  res.end(_e._successJson('Success', data))
})

/**
 * update testx2 detail by id
 */
 router.post(`/testx2/saveundefinedDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  const data = req.body.data
  data.tab = req.query.tab
  const result = await _generate_camel_case_Sv.saveundefinedDetailById(id, data)
  if (!result) {
    res.end(_e._errorByHandJSon(ERROR))
  }
  res.end(_e._successJson(id && id != 'new' ? UPDATE_SUCCESS : ADD_SUCCESS, {id: result}))
})

/**
 * change status testx2 by id
 */
router.post(`/testx2/postChangeStatus`, async (req, res) =>{
  const conds = req.body
  const data = await CommonSv.postChangeStatus(conds)
  res.end(_e._successJson(SUCCESS, data))
})
export default router