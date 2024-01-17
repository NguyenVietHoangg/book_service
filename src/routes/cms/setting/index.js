import express from 'express'
import * as _e from '../../../config/eResponse'
import { ERROR, SUCCESS,UPDATE_SUCCESS, UPDATE_FAILED } from '../../../config/typeAlias'
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
router.post(`/setting/getPermissionList`, async (req, res) =>{
  const data = await settingSv.getPermissionList()
  res.end(_e._successMenu(SUCCESS, data))
})
router.post(`/setting/addRoleHasPermission`, async (req, res) =>{
  const data = await settingSv.addRoleHasPermission(req.body)
  if(data){
    res.end(_e._successPermission(UPDATE_SUCCESS, data))
    
  }else{
    res.end(_e._errorPermission(UPDATE_FAILED, data))

  }
})
router.post(`/setting/deleteRoleHasPermission`, async (req, res) =>{
  const data = await settingSv.deleteRoleHasPermission(req.body)
  if(data){
    res.end(_e._successPermission(UPDATE_SUCCESS, data))
  } else{
    res.end(_e._errorPermission(UPDATE_FAILED, data))

  }
})


export default router