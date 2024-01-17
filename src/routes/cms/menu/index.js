import express from 'express'
import * as _e from '../../../config/eResponse'
import { ADD_SUCCESS, UPDATE_SUCCESS, SUCCESS, ERROR, NOT_FOUND } from '../../../config/typeAlias'
import * as menu from './service'
import {decodeToken} from '../../../helpers/jwtToken'
const router = express.Router()
router.post(`/menu`, async (req, res) =>{
    const token = req.header('Authorization');
    const groupRoleID = decodeToken(token).grouproleid
    const data = await menu.getMenuList(groupRoleID)
    res.end(_e._successMenu(SUCCESS, data))
  })
  router.post(`/setmenu`, async (req, res) =>{
    const data = await menu.setMenuList(req.body)
    if(data){
      res.end(_e._successMenu(SUCCESS, data))
    }
    else{
      res.end(_e._errorMenu(ERROR, data))
    }
   
  })
  export default router