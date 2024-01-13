
export const tableGenerate = (tableName) => ({
  name: tableName,
  main:[ 
    {
      field: 'name',
      alias: 'name',
      dataType: 'STRING',
      allowNull: false,
      unique: true,
      typeView: 'input_simple',
      validate: true
    },
    {
      field: 'alt',
      alias: 'alt',
      dataType: 'STRING',
      allowNull: false,
      unique: true,
      typeView: 'input_simple',
      validate: true
    },
    {
      field: 'path',
      alias: 'path',
      dataType: 'STRING',
      allowNull: false,
      unique: true,
      typeView: 'input_simple',
      validate: true
    },
    {
      field: 'fullpath',
      alias: 'fullpath',
      dataType: 'STRING',
      allowNull: false,
      unique: true,
      typeView: 'input_upload',
      validate: true
    },
    {
      field: 'type',
      alias: 'type',
      dataType: 'STRING',
      defaultValue: '',
      unique: false,
      typeView: 'input_simple',
      validate: false
    },
    {
      field: 'inside',
      alias: 'inside',
      dataType: 'BOOLEAN',
      defaultValue: 1,
      unique: false,
      typeView: 'input_simple',
      validate: false
    },
    {
      field: 'userId',
      alias: 'userId',
      dataType: 'INTEGER',
      defaultValue: null,
      unique: false,
      typeView: 'input_simple',
      validate: false
    },
    {
      field: 'status',
      alias: 'status',
      dataType: `ENUM("on", "off")`,
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
export const dataType = ['STRING', 'STRING(32)', 'STRING(64)','STRING(255)', 'STRING(512)', 'STRING(1024)', 'INTEGER', 'TINYINT', 'BIGINT', 'ENUM', 'BOOLEAN', 'TEXT', 'TEXT(5000)', 'TEXT(10000)', 'BIGINT', 'DOUBLE', 'REAL', 'DATE']
export const typeRelation = ['hasOne', 'hasMany', 'belongTo', 'belongToMany']
export const fieldMainRequire = ['field', 'alias', 'dataType', 'typeView'];
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
  fields: ['file_a', 'field_b'],
  unique: true
}
export const indexesItemExam = {
  fields: ['field_a', 'field_b'],
  unique: true
}