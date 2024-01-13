import express from 'express'
import * as _e from '../../../config/eResponse'
import { ADD_SUCCESS, UPDATE_SUCCESS, SUCCESS, ERROR, NOT_FOUND } from '../../../config/typeAlias'
import collectionSv from './service'
const router = express.Router()
/**
 * get pagination list
 */
router.post(`/collection/getCollectionList`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await collectionSv.getCollectionList(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})

/**
 * get collection detail by id
 */
 router.get(`/collection/getCollectionDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  let data = await collectionSv.getCollectionDetailById(id)
  if (!data) {
    res.end(_e._errorByHandJSon(NOT_FOUND))
  }
  res.end(_e._successJson('Success', data))
})

/**
 * update collection detail by id
 */
 router.post(`/collection/saveCollectionDetailById/:id`, async (req, res) =>{
  const id = req.params.id
  const data = req.body.data
  data.tab = req.query.tab
  const result = await collectionSv.saveCollectionDetailById(id, data)
  if (!result) {
    res.end(_e._errorByHandJSon(ERROR))
  }
  res.end(_e._successJson(id && id != 'new' ? UPDATE_SUCCESS : ADD_SUCCESS, {id: result}))
})

export default router