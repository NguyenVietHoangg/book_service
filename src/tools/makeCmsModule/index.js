import _ from 'lodash'
import moment from 'moment'
import fs from 'fs'
import { exec } from 'child_process'

const cm = require('./../../utils/common')
/**
 * params 2: table name (required)
 * params 3: --make:[value] - value in: ['db','route','view','all']
 */
const RESET_DB = true
const _prefix_db = moment().format('YMMX')
const params = process.argv
const table = params[2]
const optionConfig = params[3]
if (!table || table.trim() === '') {
  console.log('------ missing table name in setting in params args[1]');
  process.exit()
}
global.tableSetup = table
const pathdb = `${__dirname}/designdb/setup/${global.tableSetup}.js`
if (!fs.existsSync(pathdb)) {
  console.log(`------ file setup table database /tools/designdb/setup/${table}.js is not found.`);
  process.exit();
}
global.tableSetupCamlCase = cm.camelize(table)
global.tableSetupMigrate = `${_prefix_db}-${table}`
global.tableInit = require('./designdb/setup/'+global.tableSetup)
const makeDb = require('./makes/make.database')
const makeRoute = require('./makes/make.route')
const makeView = require('./makes/make.view')
const makePrivateRouter = require('./makes/make.private.route')

let enableMakeDb, enableMakeRoute, enableMakeView, isError  = false
let enableParams = ['db','route','view','all']
let config = {}


try {
  config = require('./designdb/setup/'+global.tableSetup)
} catch (error) {
}

if (optionConfig && optionConfig.includes('--make:')) {
  let arrMake = _.split(optionConfig, ':')
  if (!arrMake[1]) {
    isError = true
  } else {
    const arr = _.split(arrMake[1], ',')
    if (!_.isEmpty(arr)) {
      _.map(arr, item => {
        if (item.trim() === 'all') {
          enableMakeDb = true
          enableMakeRoute = true
          enableMakeView = true
          return
        }
        if (enableParams.includes(item.trim())) {
          if (item.trim() === 'db') {
            enableMakeDb = true
          } else if (item.trim() === 'route') {
            enableMakeRoute = true
          } else if (item.trim() === 'view') {
            enableMakeView = true
          }
        }
      })
    }
  }
} else {
  console.log('------ missing parram --make:[options] in params args[2] - maybe examp --make:db or --make:db,route or --make:db,route,view or --make:all')
  isError = true
}

const init = async () => {
  if (table && !optionConfig) {
    await makeDb.makePathDb()
    return
  }
  const pathdb = `${__dirname}/designdb/setup/${global.tableSetup}.js`
  if (!fs.existsSync(pathdb)) {
    console.log(`=========== table "${global.tableSetup}" not exist in setupdb !!! =========`)
    return
  }
  if (isError) {
    return
  }
  console.log('================== SETUP DATA.... ===================\n\n')
  const dbSetup = config.tableGenerate(tableSetup)
  const dataType = config.dataType
  const typeView = config.typeView
  const typeRelation = config.typeRelation
  const fieldMainRequire = config.fieldMainRequire
  const relationRequire = config.relationRequire
  const uniquesRequire = config.uniquesRequire
  const indexesRequire = config.indexesRequire

  // validation
  let dataTypeInvalid = []
  let typeViewInvalid = []
  let fieldMainRequireInvalid = []
  let relationRequireInvalid = []
  let relationInvalid = []
  let indexesRequireInvalid = []
  let uniquesRequireInvalid = []
  _.map(dbSetup.main, (item, index) => {
    let keys = _.keys(item);
    _.map(fieldMainRequire, it => {
      if (!keys.includes(it)) {
        fieldMainRequireInvalid.push(`missing ${it} in main object(${index}): ${JSON.stringify(item)}`)
      }
    })

    if (!dataType.includes(item.dataType) && !dataType.includes('ENUM')) {
      dataTypeInvalid.push(`missing dataType or invalid value as ${item.dataType} in typeRelation of main object(${index}): ${JSON.stringify(item)}`)
    }
    if (!typeView.includes(item.typeView)) {
      typeViewInvalid.push(`missing typeView or invalid value as ${item.typeView} in typeView of main object(${index}): ${JSON.stringify(item)}`)
    }
  })

  if (dbSetup.relation && dbSetup.relation.length) {
    _.map(dbSetup.relation, (item, index) => {
      let keys = _.keys(item)
      _.map(relationRequire, it => {
        if (!keys.includes(item)) {
          relationRequireInvalid.push(`missing relationRequire in relation object${index}: ${JSON.stringify(item)}`)
        }
      })
      if (!typeRelation.includes(item.type)) {
        relationInvalid.push(`missing type or type invalid as ${item.type} in relation type in object${index}: ${JSON.stringify(item)}`)
      }
    })
  }

  if (dbSetup.uniques && dbSetup.uniques.length) {
    _.map(dbSetup.uniques, (item, index) => {
      let keys = _.keys(item)
      _.map(uniquesRequire, it => {
        if (!keys.includes(it)) {
          uniquesRequireInvalid.push(`missing uniquesRequire in uniques object${index}: ${JSON.stringify(item)}`)
        }
      })
    })
  }

  if (dbSetup.indexes && dbSetup.indexes.length) {
    _.map(dbSetup.indexes, (item, index) => {
      let keys = _.keys(item)
      _.map(indexesRequire, it => {
        if (!keys.includes(it)) {
          indexesRequireInvalid.push(`missing indexesRequire in indexes object${index}: ${JSON.stringify(item)}`)
        }
      })
    })
  }

  if (fieldMainRequireInvalid.length) {
    console.log('------ type fieldMainRequire Invalid:', fieldMainRequireInvalid)
    return
  }

  if (relationRequireInvalid.length) {
    console.log('------ type  relationRequire Invalid:', relationRequireInvalid)
    return
  }

  if (dataTypeInvalid.length) {
    console.log('------ dataType Invalid:', dataTypeInvalid)
    console.log('------ dataType will require and only accept in array:', dataType)
    return
  }

  if (typeViewInvalid.length) {
    console.log('------ typeView Invalid:', typeViewInvalid)
    console.log('------ typeView will require and only accept in array:', typeView)
    return
  }

  if (relationInvalid.length) {
    console.log('------ type Relation Invalid:', relationInvalid)
    console.log('------ type relation will require and only accept in array:', typeRelation)
    return
  }

  if (indexesRequireInvalid.length) {
    console.log('------ type indexesRequire Invalid:', indexesRequireInvalid)
    console.log('------ type indexesRequire will require and only accept in array:', indexesRequire)
    return
  }

  if (uniquesRequireInvalid.length) {
    console.log('------ type uniquesRequire Invalid:', uniquesRequireInvalid)
    console.log('------ type uniquesRequire will require and only accept in array:', uniquesRequire)
    return
  }

  // make all
  if (enableMakeView) {
    console.log('enableMakeView')
    await makeView.make()
  }

  if (enableMakeDb) {
    console.log('enableMakeDb')
    await makeDb.make()
  }

  if (enableMakeRoute) {
    console.log('enableMakeRoute')
    await makeRoute.make()
    await makePrivateRouter.make()
  }

  return

  await exec('npx sequelize-cli db:migrate', (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err)
    } else {
     // the *entire* stdout and stderr (buffered)
     console.log(`stdout: ${stdout}`);
     console.log(`stderr: ${stderr}`);
    }
  });
  if (RESET_DB) {
    await exec('npm run resetdb', (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err)
      } else {
       // the *entire* stdout and stderr (buffered)
       console.log(`stdout: ${stdout}`);
       console.log(`stderr: ${stderr}`);
      }
    });
  }
}

init()