import fs from 'fs'
import makeDir from 'make-dir'

export const make = async () => {
  try {
    console.log('================== BEGIN - BUILD CMS ROUTER ====================')
    const pathCmsRoute = `${__dirname}/../../../routes/cms/${global.tableSetup}`
    const pathCmsRouteContent = `${__dirname}/../cmsRoutes`
    const fileCmsIndex = `${pathCmsRoute}/index.js`
    const fileCmsService = `${pathCmsRoute}/service.js`
    if (fs.existsSync(`${pathCmsRoute}/index.js`)) {
      console.log(`----- Folder ${global.tableSetup} router is exist => skip!\n`)
      return
    } else {
      await makeDir(pathCmsRoute)
    }
    let contentCmsIndex = fs.readFileSync(`${pathCmsRouteContent}/_index.js`, 'utf8')
    let contentCmsService = fs.readFileSync(`${pathCmsRouteContent}/_service.js`, 'utf8')
    contentCmsIndex = contentCmsIndex.replace(/_content_json/g, '').replace(/_table_generate_camel_case_/g, global.tableSetupCamelCase).replace(/_table_generate_/g, global.tableSetup)
    contentCmsService = contentCmsService.replace(/_content_json/g, '').replace(/_table_generate_camel_case_/g, global.tableSetupCamelCase).replace(/_table_generate_/g, global.tableSetup)
    console.log(`.......process route cms ...`)
    fs.writeFile(fileCmsIndex, contentCmsIndex, function(err) {
    })
    fs.writeFile(fileCmsService, contentCmsService, function(err) {
    })
    console.log('================== END - BUILD CMS ROUTER ====================\n')

    console.log('================== BEGIN - BUILD CRUD ROUTER ====================')
    const pathCrudlRoute = `${__dirname}/../../../routes/crud/${global.tableSetup}`
    const pathCrudlRouteContent = `${__dirname}/../crudRoutes`
    const fileCrudIndex = `${pathCrudlRoute}/index.js`
    const fileCrudService = `${fileCrudService}/service.js`
    if (fs.existsSync(`${pathCrudlRoute}/index.js`)) {
      console.log(`----- Folder ${global.tableSetup} router is exist => skip!\n`)
      return
    } else {
      await makeDir(pathCrudlRoute)
    }
    let contentCrudIndex = fs.readFileSync(`${pathCrudlRouteContent}/_index.js`, 'utf8')
    let contentCrudService = fs.readFileSync(`${pathCrudlRouteContent}/_service.js`, 'utf8')
    contentCrudIndex = contentCrudIndex.replace(/_content_json/g, '').replace(/_table_generate_camel_case_/g, global.tableSetupCamelCase).replace(/_table_generate_/g, global.tableSetup)
    contentCrudService = contentCrudService.replace(/_content_json/g, '').replace(/_table_generate_camel_case_/g, global.tableSetupCamelCase).replace(/_table_generate_/g, global.tableSetup)
    console.log(`.......process route crud ...`)
    fs.writeFile(fileCrudIndex, contentCrudIndex, function(err) {
    })
    fs.writeFile(fileCrudService, contentCrudService, function(err) {
    })
    console.log('================== END - BUILD CRUD ROUTER ====================\n')
  } catch(err) {
    console.error('Catch error make router', err)
  }
}