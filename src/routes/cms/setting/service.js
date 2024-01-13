import _, { isInteger } from 'lodash'
import settingAppInfoDefault from '../../../config/settingAppInfo'

import * as Model from '../../../database/models'
import * as _e from '../../../config/eResponse'

export const getSettingAppInfo = async () => {
  let where = {
    type: 'app_info'
  }
  let res = await Model.setting.findOne({
    where: where
  })
  if (res) {
    return {...settingAppInfoDefault, ...res.toJSON()}
  } else {
    return settingAppInfoDefault
  }
}

export const saveSettingAppInfo = async (data = settingAppInfoDefault) => {
  await Model.category.update(Model.setupUpdate(data), {
    where: {type: 'app_info'}
  })
}

export default {
  getSettingAppInfo,
  saveSettingAppInfo,
}