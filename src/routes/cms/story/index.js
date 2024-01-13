import express from 'express'
import * as _e from '../../../config/eResponse'
import { ADD_SUCCESS, UPDATE_SUCCESS, SUCCESS, ERROR, NOT_FOUND } from '../../../config/typeAlias'
import storySv from './service'
const router = express.Router()
/**
 * get pagination list
 */
router.post(`/story/getStoryList`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await storySv.getStoryList(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})

/**
 * get story detail by id
 */
 router.get(`/story/getStoryDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  let data = await storySv.getStoryDetailById(id)
  if (!data) {
    res.end(_e._errorByHandJSon(NOT_FOUND))
  }
  res.end(_e._successJson('Success', data))
})

/**
 * update story detail by id
 */
 router.post(`/story/saveStoryDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  const data = req.body.data
  data.tab = req.query.tab
  const result = await storySv.saveStoryDetailById(id, data)
  if (!result) {
    res.end(_e._errorByHandJSon(ERROR))
  }
  res.end(_e._successJson(id && id != 'new' ? UPDATE_SUCCESS : ADD_SUCCESS, {id: result}))
})

export default router