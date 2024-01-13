import fs from 'fs'
import beautify from 'js-beautify'
import _ from 'lodash'
import moment from 'moment'

const pathTableModel = `${__dirname}/../designdb`
const beautifySetting = { indent_size: 2, space_in_empty_paren: true }
let structDb = {};

const init = () => {
  try {
    const tableInit = require('../designdb/setup/'+global.tableSetup)
    structDb = tableInit.tableGenerate(global)
  } catch (error) {
    console.log(`========= table "${global.tableSetup}" must declare before build db !!! ========`)
    process.exit()
  }
}

export const make = () => {
  init()
  try {
    console.log('================== BEGIN - BUILD MODEL ====================')
    const pathDatabase = `${__dirname}/../../../database`
    const pathDatabaseContent = `${__dirname}/../databases`
    const fileModel = `${pathDatabase}/models/${global.tableSetup}.js`
    const fileMigrate = `${pathDatabase}/migrations/${global.tableSetupMigrate}.js`
    const fileSeeder = `${pathDatabase}/seeders/${global.tableSetupMigrate}.js`
    const fileTemplate = `${pathDatabase}/templates/${global.tableSetup}.js`
    if (fs.existsSync(fileModel)) {
      console.log(`----- Model ${global.tableSetup} is exist => skip!\n`)
      return
    }

    let contentDatabase = fs.readFileSync(`${pathDatabaseContent}/_model.js`, 'utf8')
    let contentMigrate = fs.readFileSync(`${pathDatabaseContent}/_migrate.js`, 'utf8')
    let contentSeeder = fs.readFileSync(`${pathDatabaseContent}/_seeder.js`, 'utf8')
    let contentTemplate = fs.readFileSync(`${pathDatabaseContent}/_template.js`, 'utf8')

    const model = generateModel()
    contentDatabase = contentDatabase.replace(/_model_struct_text/g, model.listStruct.join(`,\n`)).replace(/_model_relation_text/g, model.listRelation.join(`,\n`)).replace(/_table_generate_/g, global.tableSetup)
    const migrate = generateMigrate()
    const listUniques = generateFieldUniques()
    const listIndexes = generateFieldIndexes()
    contentMigrate = contentMigrate.replace(/_migrate_content_text/g, migrate.join(',\n')).replace(/_table_generate_/g, global.tableSetup).replace(/_migrate_uniques_text/g, listUniques).replace(/_migrate_indexes_text/, listIndexes)
    contentSeeder = contentSeeder.replace(/_table_generate_/g, global.tableSetup)
    contentTemplate = contentTemplate.replace(/_table_generate_/g, global.tableSetup)
    console.log(`.......process model...`)
    fs.writeFile(fileModel, beautify.js(contentDatabase, beautifySetting), function(err) {
    })
    fs.writeFile(fileMigrate, beautify.js(contentMigrate, beautifySetting), function(err) {
    })
    fs.writeFile(fileSeeder, beautify.js(contentSeeder, beautifySetting), function(err) {
    })
    fs.writeFile(fileTemplate,  beautify.js(contentTemplate, beautifySetting), function(err) {
    })
    console.log('================== END - BUILD MODEL ====================\n')
  } catch(err) {
    console.error(err)
  }
}

export const makePathDb = async () => {
  const pathdb = `${__dirname}/../designdb/setup/${global.tableSetup}.js`
  const pathDbTemplate = `${__dirname}/../designdb/config.js`
  try {
    await new Promise((resolve, reject) => {
      if (!fs.existsSync(pathdb)) {
        // clone db template
        fs.copyFile(pathDbTemplate, pathdb, async (err) => {
          console.log(`============ make table ${global.tableSetup} successlly! =======\n`)
          resolve(true)
        })
        resolve(true)
      }
      resolve(true)
    })
  } catch(err) {
    console.error(err)
  }
  return true
}

const generateModel = () => {
  let listStruct = []
  let contentStruct = fs.readFileSync(`${pathTableModel}/table.d.ts`, 'utf8')
  _.map(structDb.main, (item) => {
    if (!item.field) {
      throw new Error(`----- Model ${global.tableSetup} missing field in config!`)
    }
    let ct = _.cloneDeepWith(contentStruct)
    ct = ct.replace(/_field_db/, item.field).replace(/type_value_db/, item.dataType ? `DataTypes.${item.dataType.replace(/'/g, '')}` : 'DataTypes.STRING').replace(/_default_value_db/, item.defaultValue ? `'${item.defaultValue}'`: null)
    if (item.unique) {
      ct += ',\nunique: true'
    }
    if (item.require) {
      ct += ',\nrequire: true'
    }
    if (item.allowNull) {
      ct += ',\nallowNull: true'
    }
    ct += '\n}'
    listStruct.push(ct)
  })

  let listRelation = []
  if (structDb.relation && structDb.relation.length) {
    let contentRelation = fs.readFileSync(`${pathTableModel}/relation.d.ts`, 'utf8')
    let contentRelationBelongTo = fs.readFileSync(`${pathTableModel}/relation.belongtomany.d.ts`, 'utf8')
    _.map(structDb.relation, (item) => {
      let ct = _.cloneDeepWith(contentRelation)
      if (item.type !== 'belongsToMany') {
        ct = ct.replace(/_table_model_main/, global.tableSetup).replace(/_table_model_relation/,`${item.table}`).replace(/_type_relation/, `${item.type}`).replace(/_id_foreign_key/, `'${item.foreignKey}'`).replace(/_table_model_as_relation/g, item.as ? `'${item.as}'` : `'${item.table}'`)
      } else {
        ct = _.cloneDeepWith(contentRelationBelongTo)
        ct = ct.replace(/_table_model_main/, global.tableSetup).replace(/_table_model_relation/,`${item.table}`).replace(/_type_relation/, `${item.type}`).replace(/_id_foreign_key/, `'${item.foreignKey}'`).replace(/_table_model_child_relation/g, item.tableChild)
      }
      listRelation.push(ct)
    })
  }
  const data = {
    listStruct: listStruct,
    listRelation: listRelation
  }
  return data
}

const generateMigrate = () => {
  let listStruct = []
  let contentStruct = fs.readFileSync(`${pathTableModel}/table.d.ts`, 'utf8')
  _.map(structDb.main, (item) => {
    if (!item.field) {
      throw new Error(`----- Model ${global.tableSetup} missing field in config!`)
    }
    let ct = _.cloneDeepWith(contentStruct)
    ct = ct.replace(/_field_db/, item.field).replace(/type_value_db/, item.dataType ? `Sequelize.${item.dataType.replace(/'/g, '')}` : 'Sequelize.STRING').replace(/_default_value_db/, item.defaultValue ? `'${item.defaultValue}'`: null)
    if (item.unique) {
      ct += ',\n  unique: true'
    }
    if (item.require) {
      ct += ',\n  require: true'
    }
    if (item.allowNull) {
      ct += ',\n  allowNull: true'
    }
    ct += '\n}'
    listStruct.push(ct)
  })
  return listStruct
}

const generateFieldUniques = () => {
  let listUniques = '{\n'
  const datenow = (moment().format('YmdH')).trim()
  _.map(structDb.uniques, (item, index) => {
    if (!item.fields || !item.name) {
      throw new Error(`----- Uniques ${global.tableSetup} missing fields or name or unique field in config!`)
    }
    if (!_.isArray(item.fields) || _.isEmpty(item.fields) || !_.isString(item.name)) {
      throw new Error(`----- Uniques ${global.tableSetup} error fields or name or unique field in config!`)
    }
    let fieldString = []
    _.map(item.fields, fl => {
      fieldString.push("'"+fl+"'")
    })
    const stringNew = '['+(fieldString.join(','))+']'
    listUniques += `\n${global.tableSetup}_${datenow.trim()}_${item.name.trim()}: {\n`
    listUniques += `fields: ${stringNew},\n`
    listUniques += `index: true`
    listUniques += `\n},`
  })
  listUniques += `\n}`
  return listUniques
}

const generateFieldIndexes = () => {
  let listIndexes = ''
  _.map(structDb.uniques, (item, index) => {
    if (!item.fields || !item.name) {
      throw new Error(`----- Indexes ${global.tableSetup} missing fields or name or unique field in config!`)
    }
    if (!_.isArray(item.fields) || _.isEmpty(item.fields) || !_.isString(item.name)) {
      throw new Error(`----- Indexes ${global.tableSetup} error fields or name or unique field in config!`)
    }
    let fieldString = []
    _.map(item.fields, fl => {
      fieldString.push("'"+fl+"'")
    })
    const stringNew = '['+(fieldString.join(','))+']'
    listIndexes += `queryInterface.addIndex('${global.tableSetup}', ${stringNew}, {\n`
    listIndexes += `unique: ${item.index ? true : false}`
    listIndexes += '})\n'
  })
  return listIndexes
}