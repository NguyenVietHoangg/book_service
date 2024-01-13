import express from 'express'
import * as _e from '../../../config/eResponse'
import { SUCCESS } from '../../../config/typeAlias'
import commonSv from './service'
const router = express.Router()
/**
 * get pagination list
 */
router.post(`/common/getCommonRefs`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await commonSv.getCommonRefs(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})

router.post(`/common/postChangeStatus`, async (req, res) =>{
  const conds = req.body
  const data = await commonSv.postChangeStatus(conds)
  res.end(_e._successJson(SUCCESS, data))
})

export default router