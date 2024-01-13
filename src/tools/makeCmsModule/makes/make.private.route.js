import fs from 'fs'
import _ from 'lodash'
import moment from 'moment'

export const make = async () => {
  try {
    console.log('================== BEGIN - BUILD PRIVATE CMS ROUTER ====================')
    const pathRouteCmsPrivate = `${__dirname}/../../../routes/cms`
    let contentRouterCmsPrivateIndex = fs.readFileSync(`${pathRouteCmsPrivate}/private.js`, 'utf8')
    // let contentCms = _.cloneDeepWith(regexCms.exec(contentRouterCmsPrivateIndex))
    // console.log('contentCms', regexCms.exec(contentRouterCmsPrivateIndex))
    // return
    let contentCms = (((contentRouterCmsPrivateIndex.split('[')[1]).split([']'])[0]).replace(/[\r\n]/gm, '')).replace( /  +/g, ' ' ).replaceAll(' ', '');
    contentCms = contentCms.split(',');
    if (contentCms.includes(`[${global.tableSetup}`) || contentCms.includes(`, ${global.tableSetup}`)) {
      console.log(`----- Route ${global.tableSetup} added => skip!\n`)
      return
    }
    contentCms.push(global.tableSetup);

    let contentCmsFile = ''
    _.map(contentCms, (item) => {
      contentCmsFile += `import ${item.trim()} from './${item.trim()}'\n`
    })
    contentCmsFile += `const router = [${contentCms.join(', ')}]\n`
    contentCmsFile += `export default router\n`
    console.log(`.......process route private...`)
    //backup private route
    const pathRouteCmsBackup = `${__dirname}/../routeBackup/private_cms_${moment().format('YMMX')}.js`
      fs.writeFile(pathRouteCmsBackup, contentRouterCmsPrivateIndex, function(err) {
    })
    //update private route
      fs.writeFile(`${pathRouteCmsPrivate}/private.js`, contentCmsFile, function(err) {
    })
    console.log('================== END - BUILD PRIVATE CMS ROUTER ====================\n')

    console.log('================== BEGIN - BUILD PRIVATE CURD ROUTER ====================')
    const pathRouteCrudPrivate = `${__dirname}/../../../routes/crud`
    let contentCrudRouterPrivateIndex = fs.readFileSync(`${pathRouteCrudPrivate}/private.js`, 'utf8')
    let regexCrud = /\[.*]/
    let contentCrud = _.cloneDeepWith(regexCrud.exec(contentCrudRouterPrivateIndex))
    if (contentCrud[0].includes(`[${global.tableSetup}`) || contentCrud[0].includes(`, ${global.tableSetup}`)) {
      console.log(`----- Route ${global.tableSetup} added => skip!\n`)
      return
    }
    contentCrud = contentCrud[0].replace('[', '').replace(']', '')
    contentCrud = contentCrud ? `${contentCrud}, ${global.tableSetup}` : global.tableSetup

    let arrContentCrud = contentCrud.split(',')
    let contentCrudFile = ''
    _.map(arrContentCrud, (item) => {
      contentCrudFile += `import ${item.trim()} from './${item.trim()}'\n`
    })
    contentCrudFile += `const router = [${arrContentCrud.join(',')}]\n`
    contentCrudFile += `export default router\n`
    console.log(`.......process route private...`)
    //backup private route
    const pathRouteCrudBackup = `${__dirname}/../routeBackup/private_curd_${moment().format('YMMX')}.js`
      fs.writeFile(pathRouteCrudBackup, contentCrudRouterPrivateIndex, function(err) {
    })
    //update private route
      fs.writeFile(`${pathRouteCrudPrivate}/private.js`, contentCrudFile, function(err) {
    })
    console.log('================== END - BUILD PRIVATE CURD ROUTER ====================\n')
  } catch (error) {
    console.error('Catch error make private router', error)
  }
}