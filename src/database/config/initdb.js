import * as Model from '../models'
const run = async () => {
  // insert grouprole
  const groups =	[
    {
      "id" : 1,
      "name" : "Root",
      "description" : null,
      "type" : "root",
      "status" : "on",
      "updatedBy" : null,
      "deletedAt" : null,
      "createdAt" : "2020-07-09 03:39:45",
      "updatedAt" : "2020-07-09 10:39:54"
    }
  ]
  await Model.grouprole.bulkCreate(groups, { ignoreDuplicates: true })

  // insert permission ref
  const pers = await Model.permission.findAll({
    attributes: ['id']
  });
  const refs = pers.map(item => {
    return {
      'permissionId': item.id,
      'groupId': 1
    }
  })
  console.log(JSON.stringify(pers));
  await Model.grouprole_has_permission.bulkCreate(refs, { ignoreDuplicates: true })

  // insert user root
  const users =[
    {
      "id" : 1,
      "fullname" : "root",
      "name" : "root",
      "avatar" : "/uploads/6-2020/image-1594610161.png",
      "address" : "rootAddress",
      "email" : "root@gmail.com",
      "phone" : "0385315138",
      "password" : "d0bc51aec63fbe089a28f47e7ad9300e", // Abc#123456
      "type" : "root",
      "grouproleId": 1,
      "createdAt": "2020-07-09 03:14:56",
      "updatedAt": "2020-07-09 03:14:56"
	  }
  ]
  await Model.user.bulkCreate(users, { ignoreDuplicates: true })

  // insert menu
  const settingList = [
    {
    	"id" : 1,
    	"name" : "header",
    	"type" : "Header",
    	"icon" : null,
    	"content" : "{}",
    	"status" : "on",
    	"updatedBy" : null,
    	"deletedAt" : null,
    	"createdAt" : "2020-08-15 12:11:07",
    	"updatedAt" : "2020-08-15 12:11:07"
    },
    {
    	"id" : 2,
    	"name" : "footer",
    	"type" : "Footer",
    	"icon" : null,
    	"content" : "{}",
    	"status" : "on",
    	"updatedBy" : null,
    	"deletedAt" : null,
    	"createdAt" : "2020-08-15 12:11:07",
    	"updatedAt" : "2020-08-15 12:11:07"
    },
    {
    	"id" : 3,
    	"name" : "home",
    	"type" : "Home",
    	"icon" : null,
    	"content" : "{}",
    	"status" : "on",
    	"updatedBy" : null,
    	"deletedAt" : null,
    	"createdAt" : "2020-08-15 12:11:07",
    	"updatedAt" : "2020-08-15 12:11:07"
    },
    {
    	"id" : 4,
    	"name" : "about",
    	"type" : "About",
    	"icon" : null,
    	"content" : "{}",
    	"status" : "on",
    	"updatedBy" : null,
    	"deletedAt" : null,
    	"createdAt" : "2020-08-15 12:11:07",
    	"updatedAt" : "2020-08-15 12:11:07"
    },
    {
    	"id" : 5,
    	"name" : "contact",
    	"type" : "Contact",
    	"icon" : null,
    	"content" : "{}",
    	"status" : "on",
    	"updatedBy" : null,
    	"deletedAt" : null,
    	"createdAt" : "2020-08-15 12:11:07",
    	"updatedAt" : "2020-08-15 12:11:07"
    },
    {
    	"id" : 6,
    	"name" : "Service",
    	"type" : "Service",
    	"icon" : null,
    	"content" : "{}",
    	"status" : "on",
    	"updatedBy" : null,
    	"deletedAt" : null,
    	"createdAt" : "2020-08-15 12:11:07",
    	"updatedAt" : "2020-08-15 12:11:07"
    },
    {
    	"id" : 7,
    	"name" : "menu_cms",
    	"type" : "menu_cms",
    	"icon" : null,
    	"content" : "[{\"text\":\"root\",\"href\":\"/admin/grouprole\",\"icon\":\"\",\"target\":\"_self\",\"title\":\"Danh Sách Nhóm Quyền\"},{\"text\":\"root\",\"href\":\"/admin/setting/edit/7\",\"icon\":\"\",\"target\":\"_self\",\"title\":\"Menu CMS\"},{\"text\":\"root\",\"href\":\"/admin/setting/edit/10\",\"icon\":\"\",\"target\":\"_self\",\"title\":\"Menu WEB\"},{\"text\":\"root\",\"href\":\"/admin/setting\",\"icon\":\"\",\"target\":\"_self\",\"title\":\"Danh sách Cài Đặt\"},{\"text\":\"admin,custom\",\"href\":\"/admin/story\",\"icon\":\"\",\"target\":\"_self\",\"title\":\"Danh Sách Bài Viết\"},{\"text\":\"admin\",\"href\":\"/admin/category\",\"icon\":\"\",\"target\":\"_self\",\"title\":\"Danh Sách Thể Loại\"},{\"text\":\"admin\",\"href\":\"/admin/collection\",\"icon\":\"\",\"target\":\"_self\",\"title\":\"Danh Sách Bộ Sưu Tập\"},{\"text\":\"root,admin\",\"href\":\"/admin/adminstrator\",\"icon\":\"\",\"target\":\"_self\",\"title\":\"Danh Sách Tài Khoản\"}]",
    	"status" : "on",
    	"updatedBy" : null,
    	"deletedAt" : null,
    	"createdAt" : "2020-08-15 12:11:07",
    	"updatedAt" : "2020-12-30 15:46:43"
    },
    {
    	"id" : 8,
    	"name" : "seo_web",
    	"type" : "Seo web",
    	"icon" : null,
    	"content" : "{}",
    	"status" : "on",
    	"updatedBy" : null,
    	"deletedAt" : null,
    	"createdAt" : "2020-08-15 12:11:07",
    	"updatedAt" : "2020-08-15 12:11:07"
    },
    {
    	"id" : 9,
    	"name" : "tool_and_social",
    	"type" : "Tool va social",
    	"icon" : null,
    	"content" : "{}",
    	"status" : "on",
    	"updatedBy" : null,
    	"deletedAt" : null,
    	"createdAt" : "2020-08-15 12:11:07",
    	"updatedAt" : "2020-08-15 12:11:07"
    },
    {
    	"id" : 10,
    	"name" : "Menu Website",
    	"type" : "menu_website",
    	"icon" : null,
    	"content" : "{}",
    	"status" : "on",
    	"updatedBy" : null,
    	"deletedAt" : null,
    	"createdAt" : "2020-12-30 15:25:46",
    	"updatedAt" : "2020-12-30 15:25:46"
    }
  ]
  await Model.setting.bulkCreate(settingList, { ignoreDuplicates: true })
}

run()