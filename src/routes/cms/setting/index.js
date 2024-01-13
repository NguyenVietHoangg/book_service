import express from 'express'
import * as _e from '../../../config/eResponse'
import { SUCCESS } from '../../../config/typeAlias'
import settingSv from './service'
const router = express.Router()

router.get(`/setting/getSettingAppInfo`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await settingSv.getSettingAppInfo(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})

router.post(`/setting/saveSettingAppInfo`, async (req, res) =>{
  const page = req.query.page
  const conds = req.body
  const data = await settingSv.saveSettingAppInfo(conds, page)
  res.end(_e._successJson(SUCCESS, data))
})


export default router