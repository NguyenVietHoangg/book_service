import _, { isInteger } from 'lodash'
import { LIMIT } from '../../../config/common'
import { genSlug } from '../../../utils/stringHelpers'
import * as Model from '../../../database/models'
import * as _e from '../../../config/eResponse'
const { Op } = Model.sequelize

function filterDataByRole(item, role) {
    if (item.role && item.role.includes(role)) {
        return true;
    }

    if (item.children && item.children.length > 0) {
        // Duyệt qua tất cả các phần tử con
        return item.children.some(child => filterDataByRole(child, role));
    }

    return false;
}

export const getMenuList = async (roleId) => {
    const role = await Model.grouprole.findOne({ where: { id: roleId } });
    const menuList = await Model.menu.findOne({ where: { id: '10' } });
    const jsonData = JSON.parse(JSON.parse(menuList.desc).data);
    const filteredData = jsonData.filter(item => filterDataByRole(item, role.name));
    //const a = JSON.stringify(filteredData)
    //console.log(typeof menuList)
    
    return filteredData;
};

export const setMenuList = async (data) => {
    var menu
    var db = JSON.stringify(data);
    const existingMenu = await Model.menu.findOne({ where: { id: '10' } });
    if (existingMenu) {
        // Nếu bản ghi tồn tại, cập nhật giá trị
        menu = await existingMenu.update({ desc: db });
    } else {
        // Nếu bản ghi không tồn tại, tạo mới
        menu = await Model.menu.create({
            id: '10',
            grouproleId: '1',
            desc: db
        });
    }
    return menu;
}

