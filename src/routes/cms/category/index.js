import express from 'express'
import * as _e from '../../../config/eResponse'
import { ADD_SUCCESS, UPDATE_SUCCESS, SUCCESS, ERROR, NOT_FOUND } from '../../../config/typeAlias'
import categorySv from './service'
const router = express.Router()
/**
 * get pagination list
 */
router.post(`/category/getCategoryList`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await categorySv.getCategoryList(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})

/**
 * get category detail by id
 */
 router.get(`/category/getCategoryDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  let data = await categorySv.getCategoryDetailById(id)
  if (!data) {
    res.end(_e._errorByHandJSon(NOT_FOUND))
  }
  res.end(_e._successJson('Success', data))
})

/**
 * update category detail by id
 */
 router.post(`/category/saveCategoryDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  const data = req.body.data
  data.tab = req.query.tab
  const result = await categorySv.saveCategoryDetailById(id, data)
  if (!result) {
    res.end(_e._errorByHandJSon(ERROR))
  }
  res.end(_e._successJson(id && id != 'new' ? UPDATE_SUCCESS : ADD_SUCCESS, {id: result}))
})

/**
 * get parentId by cate id
 */
router.get(`/category/getCategoryParentList/:id`, async (req, res) =>{
  const id = req.params.id
  const data = await categorySv.getCategoryParentList(id)
  res.end(_e._successJson(SUCCESS, data))
})


export default router