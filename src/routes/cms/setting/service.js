import _, { isInteger } from 'lodash'
import settingAppInfoDefault from '../../../config/settingAppInfo'

import * as Model from '../../../database/models'
import * as _e from '../../../config/eResponse'
import { Sequelize, DataTypes } from 'sequelize';
import grouprole from '../../../database/models/grouprole';

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


export const getPermissionList = async (data) => {
  try {
        // Tạo mối quan hệ "một nhiều" giữa Permission và GroupRoleHasPermission
        Model.permission.hasMany(Model.grouprole_has_permission, { foreignKey: 'permissionId' });
        Model.grouprole_has_permission.belongsTo( Model.permission, { foreignKey: 'permissionId' });

    
        const result = await  Model.permission.findAll({
          attributes: [
            'id',
            'route',
            [Sequelize.fn('GROUP_CONCAT', Sequelize.col('groupId')), 'groupIds'],
          ],
          include: [
            {
              model: Model.grouprole_has_permission,
              attributes: ['groupId'],
              where: {
                permissionId: Sequelize.col('permission.id'),
              }
            },
          ],
          group: ['permission.id', 'permission.name'],
        });
    //console.log(result)
      return result;

      
    
  } catch (error) {
    console.error('Error fetching permission list:', error);
  }
};


export default {
  getSettingAppInfo,
  saveSettingAppInfo,
  getPermissionList
}