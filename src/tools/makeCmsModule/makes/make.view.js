import fs from 'fs'
import _ from 'lodash'
import makeDir from 'make-dir'

let contentLayout = fs.readFileSync(`${__dirname}/../views/partials/layout.basic.pug`, 'utf8')
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

export const make = async () => {
  init()
  try {
    console.log('================== BEGIN - BUILD VIEW ====================')
    const pathView = `${__dirname}/../../../views/cms/pages/${global.tableSetup}`
    const pathViewContent = `${__dirname}/../views`
    const fileList = `${pathView}/list.pug`
    const fileAdd = `${pathView}/add.pug`
    const fileEdit = `${pathView}/edit.pug`
    const fileForm = `${pathView}/_form.pug`
    const fileValidation = `${pathView}/_validation.pug`
    const jsFormload = `${pathView}/_jsformload.pug`
    const tablejs = `${pathView}/_tablejs.pug`
    if (fs.existsSync(`${pathView}/list.pug`)) {
      console.log(`----- Folder ${global.tableSetup} view is exist => skip!\n`)
      return
    } else {
      await makeDir(pathView)
    }
    const contentView = generateView()
    let contentList = fs.readFileSync(`${pathViewContent}/_list.pug`, 'utf8')
    let contentAdd = fs.readFileSync(`${pathViewContent}/_add.pug`, 'utf8')
    let contentEdit = fs.readFileSync(`${pathViewContent}/_edit.pug`, 'utf8')
    let contentForm = fs.readFileSync(`${pathViewContent}/_form.pug`, 'utf8')
    let contentValidation = fs.readFileSync(`${pathViewContent}/_validation.pug`, 'utf8')
    let contentJsFormload = fs.readFileSync(`${pathViewContent}/_jsformload.pug`, 'utf8')
    let contentTablejs = fs.readFileSync(`${pathViewContent}/_tablejs.pug`, 'utf8')
    contentList = contentList.replace(/_table_generate_/g, global.tableSetup).replace(/_init_table_fields/, JSON.stringify(contentView.initTableFields))
    contentAdd = contentAdd.replace(/_table_generate_/g, global.tableSetup)
    contentEdit = contentEdit.replace(/js_upload_form/g, contentView.contentUploadOnEdit.join('\n')).replace(/_table_generate_/g, global.tableSetup)
    contentForm = contentForm.replace(/_form_content_text/g, contentView.contentForm.join('\n    ')).replace(/_table_generate_/g, global.tableSetup)
    contentValidation = contentValidation.replace(/_plugin_ready_on_load/g, contentView.readyOnLoad.join('\n')).replace(/_rules_validate_load/g, contentView.validateNames).replace(/_msg_validate_load/g, contentView.validateMsgs).replace(/_table_generate_/g, global.tableSetup)
    contentJsFormload = contentJsFormload.replace(/_table_generate_/g, global.tableSetup)
    contentTablejs = contentTablejs.replace(/_table_generate_/g, global.tableSetup)
    console.log(`.......process view...`)
    fs.writeFile(fileList, contentList, function(err) {
    })
    fs.writeFile(fileAdd, contentAdd, function(err) {
    })
    fs.writeFile(fileEdit, contentEdit, function(err) {
    })
    fs.writeFile(fileForm, contentForm, function(err) {
    })
    fs.writeFile(fileValidation, contentValidation, function(err) {
    })
    fs.writeFile(jsFormload, contentJsFormload, function(err) {
    })
    fs.writeFile(tablejs, contentTablejs, function(err) {
    })
    console.log('================== END - BUILD VIEW ====================\n')
  } catch(err) {
    console.error(err)
  }
}

const generateView = () => {
  const structDb = tableInit.tableGenerate(global.tableSetup)
  let layout = _.cloneDeepWith(contentLayout)
  let contentForm = []
  let validateNames = []
  let validateMsgs = []
  let initTableFields = []
  let contentUploadOnEdit = []
  let contentSelection = []
  let contentSelectionMultiple = []
  let onLoad = []
  let readyOnLoad = []
  let isCheckbox = false
  let isSelect = false
  let isDatepicker = false
  let isDaterangePicker = false
  let isDatetimerangePicker = false
  let isDaterangeButton = false
  let isRadio = false
  let isTextarea = false

  _.map(structDb.main, (item, index) => {
    let label = (fs.readFileSync(`${__dirname}/../views/partials/label.pug`, 'utf8')).replace(/_label_form/, item.alias ? item.alias : item.field)
    let input = (fs.readFileSync(`${__dirname}/../views/partials/${item.typeView}.pug`, 'utf8') + '\n').replace(/_input_name/g, item.field)

    if (item.typeView === 'input_select' || item.typeView === 'input_select_multiple') {
      // show option value with input selection
      let valueOptionArr = (item.dataType.replace('ENUM(', '').replace(')', '')).split(',')
      let layoutOption = valueOptionArr.map((it, index) => {
        let x = it.replace(/"/g, '').replace(/'/g, "'")
        return index !== 0 ? `            option(value='${x}' data-image='' selected=data.${item.field}===''?true:false) ${x}`
                :
                `option(value='${x}' data-image='' selected=data.${item.field}===''?true:false) ${x}`
      })
      if (!layoutOption.length) {
        layoutOption = [`option(value='1' data-image='' selected=data.${item.field}===''?true:false) giá trị 1`]
      }
      if (item.typeView === 'input_select') {
        contentSelection = layoutOption
      } else {
        contentSelectionMultiple = layoutOption
      }
      input = input.replace(/_default_value_multiple_select/g, contentSelectionMultiple.join('\n'))
      input = input.replace(/_default_value_select/g, contentSelection.join('\n'))
    }

    let itemInitTable = {field: item.field, title: item.alias || item.field}
    if (item.typeView === 'input_upload' || item.typeView==='input_upload_multiple') {
      itemInitTable.formatter = 'imageFormatter'
    }
    initTableFields.push(itemInitTable)
    if (item.validate && (item.typeView === 'input_simple' || item.typeView === 'input_select_multiple')) {
      validateNames.push(`${item.field}: {required: true}`)
      validateMsgs.push(`${item.field}: 'Please enter ${item.field}'`)
      input = `.input-data-block\n          ${input}`
      contentForm.push(layout.replace(/_label_data/g, label).replace(/_input_data/g, input).replace(/_validation_require/, "(class=errors && errors.desc && 'has-error')"))
    } else {
      contentForm.push(layout.replace(/_label_data/g, label).replace(/_input_data/g, input).replace(/_validation_require/, ""))
    }

    if (item.typeView === 'input_checkbox') {
      isCheckbox = true
    } else if (item.typeView === 'input_select' || item.typeView === 'input_select_multiple') {
      isSelect = true
    } else if (item.typeView === 'input_datepicker') {
      isDatepicker = true
    } else if (item.type === 'input_daterange_picker') {
      isDaterangePicker = true
    } else if (item.type === 'input_datetimerange_picker') {
      isDatetimerangePicker = true
    } else if (item.typeView === 'input_daterange_button') {
      isDaterangeButton = true
    } else if (item.typeView === 'input_radio') {
      isRadio = true
    } else if (item.typeView === 'input_textarea') {
      isTextarea = true
    } else if (item.typeView === 'input_upload') {
      let contentUpload = fs.readFileSync(`${__dirname}/../views/partials/js_upload.pug`, 'utf8')
      contentUploadOnEdit.push(contentUpload.replace(/_input_name/g, item.field))
    } else if (item.typeView === 'input_upload_multiple') {
      let contentUpload = fs.readFileSync(`${__dirname}/../views/partials/js_upload_multiple.pug`, 'utf8')
      contentUploadOnEdit.push(contentUpload.replace(/_input_name/g, item.field))
    }
  })
  if (isSelect) {
    readyOnLoad.push(fs.readFileSync(`${__dirname}/../views/partials/js_select.pug`, 'utf8'))
  }
  if (isTextarea) {
    readyOnLoad.push(fs.readFileSync(`${__dirname}/../views/partials/js_textarea.pug`, 'utf8'))
  }
  validateNames = `{\n        ${validateNames.join(',\n          ')}\n        }`
  validateMsgs = `{\n        ${validateMsgs.join(',\n          ')}\n        }`
  const data = {
    validateNames, validateMsgs, readyOnLoad, onLoad, contentForm, contentUploadOnEdit, initTableFields, contentSelection, contentSelectionMultiple
  }
  return data
}