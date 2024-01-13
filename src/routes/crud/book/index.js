import express from 'express'
import * as _e from '../../../config/eResponse'
import { ADD_SUCCESS, UPDATE_SUCCESS, SUCCESS, ERROR, NOT_FOUND } from '../../../config/typeAlias'
import * as sv from './service'
const router = express.Router()
const mainSv = sv.book
const commonSv = sv.commonSv
/**
 * get pagination list on book
 */
router.post(`/book/getundefinedList`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await mainSv.getundefinedList(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})

/**
 * get book detail by id
 */
 router.get(`/book/getundefinedDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  let data = await mainSv.getbookDetailById(id)
  if (!data) {
    res.end(_e._errorByHandJSon(NOT_FOUND))
  }
  res.end(_e._successJson('Success', data))
})

/**
 * update book detail by id
 */
 router.post(`/book/saveundefinedDetailById/:id`, async (req, res) =>{
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
 * change status book by id
 */
router.post(`/book/postChangeStatus`, async (req, res) =>{
  const conds = req.body
  const data = await commonSv.postChangeStatus(conds)
  res.end(_e._successJson(SUCCESS, data))
})
export default router