import _, { isInteger } from 'lodash'
import { LIMIT } from '../../../config/common'
import { genSlug } from '../../../utils/stringHelpers'
import * as Model from '../../../database/models'
import * as _e from '../../../config/eResponse'
const { Op } = Model.sequelize

export const getMenuList = async (groupRoleId) => {
    const menuList = await Model.menu.findAll({ where: { grouproleId: groupRoleId } });
    return menuList;
}
