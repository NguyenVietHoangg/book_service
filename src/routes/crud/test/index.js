import express from 'express'
import * as _e from '../../../config/eResponse'
import { ADD_SUCCESS, UPDATE_SUCCESS, SUCCESS, ERROR, NOT_FOUND } from '../../../config/typeAlias'
import * as sv from './service'
const router = express.Router()
const mainSv = sv.test
const commonSv = sv.commonSv
/**
 * get pagination list on test
 */
router.post(`/test/getundefinedList`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await mainSv.getundefinedList(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})

/**
 * get test detail by id
 */
 router.get(`/test/getundefinedDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  let data = await mainSv.gettestDetailById(id)
  if (!data) {
    res.end(_e._errorByHandJSon(NOT_FOUND))
  }
  res.end(_e._successJson('Success', data))
})

/**
 * update test detail by id
 */
 router.post(`/test/saveundefinedDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  const data = req.body.data
  data.tab = req.query.tab
  const result = await mainSv.saveundefinedDetailById(id, data)
  if (!result) {
    res.end(_e._errorByHandJSon(ERROR))
  }
  res.end(_e._successJson(id && id != 'new' ? UPDATE_SUCCESS : ADD_SUCCESS, {id: result}))
})

/**
 * change status test by id
 */
router.post(`/test/postChangeStatus`, async (req, res) =>{
  const conds = req.body
  const data = await commonSv.postChangeStatus(conds)
  res.end(_e._successJson(SUCCESS, data))
})
export default router