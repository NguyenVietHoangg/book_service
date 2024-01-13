
export const tableGenerate = (tableName) => ({
  name: tableName,
  main:[ 
    {
      field: 'name',
      alias: 'Tên group',
      dataType: 'STRING',
      allowNull: false,
      unique: true,
      typeView: 'input_simple',
      validate: true
    },
    {
      field: 'description',
      alias: 'description',
      dataType: 'STRING(500)',
      defaultValue: null,
      typeView: 'input_textarea',
      validate: true
    },
    {
      field: 'type',
      alias: 'type',
      dataType: `ENUM("admin", "partner", "seller", "custom")`,
      defaultValue: 'custom',
      unique: false,
      typeView: 'input_select',
      validate: true
    },    
    {
      field: 'status',
      alias: 'status',
      dataType: `ENUM(["on", "off"])`,
      defaultValue: 'on',
      unique: false,
      typeView: 'input_select',
      validate: false
    },
  ],
  uniques: [],
  indexes: [],
  relation: []
})

export const typeView = ['input_simple', 'input_select', 'input_select_multiple', 'input_checkbox', 'input_radio', 'input_datepicker', 'input_daterange_picker', 'input_datetimerange_picker', 'input_daterange_button', 'input_timepicker', 'input_upload', 'input_upload_multiple', 'input_textarea']
export const dataType = ['STRING', 'STRING(32)', 'STRING(64)','STRING(255)', 'STRING(512)', 'STRING(1024)', 'INTEGER', 'ENUM', 'BOOLEAN', 'TEXT', 'TEXT(5000)', 'TEXT(10000)', 'BIGINT', 'DOUBLE', 'REAL', 'DATE', 'DATETIME']
export const typeRelation = ['hasOne', 'hasMany', 'belongTo', 'belongToMany']
export const fieldMainRequire = ['field', 'alias', 'dataType'];
export const relationRequire = ['table', 'as', 'foreignKey', 'type'];
export const indexesRequire = ['fields']
export const uniquesRequire = ['name', 'fields', 'unique']
export const relationItemExam = {
  table: 'table_name',
  as: 'table_name',
  foreignKey: 'table_id',
  type: 'hasMany'
}
export const uniquesItemExam = {
  name: 'name_unique',
  field: ['file_a', 'field_b'],
  unique: true
}
export const indexesItemExam = {
  fields: ['field_a', 'field_b'],
  unique: true
}