
export const tableGenerate = (tableName) => ({
  name: tableName,
  main:[
    {
      field: 'storyId',
      alias: 'storyId',
      dataType: 'INTEGER',
      allowNull: false,
      typeView: 'input_simple',
      validate: true
    },
    {
      field: 'name',
      alias: 'name',
      dataType: 'STRING(255)',
      allowNull: false,
      typeView: 'input_simple',
      validate: true
    },
    {
      field: 'slug',
      alias: 'slug',
      dataType: 'STRING(255)',
      allowNull: false,
      typeView: 'input_simple'
    },
    {
      field: 'chapterOrder',
      alias: 'chapterOrder',
      dataType: 'INTEGER',
      allowNull: false,
      typeView: 'input_simple',
      validate: true
    },
    {
      field: 'link',
      alias: 'link',
      dataType: 'STRING(255)',
      allowNull: true,
      typeView: 'input_simple',
      validate: true
    },
    {
      field: 'position',
      alias: 'position',
      dataType: 'INTEGER',
      defaultValue: 1,
      typeView: 'input_simple',
      validate: false
    },
    {
      field: 'adsScript',
      alias: 'adsScript',
      dataType: 'STRING(1024)',
      defaultValue: '[]',
      typeView: 'input_simple',
      validate: false
    },
    {
      field: 'flag',
      alias: 'flag',
      dataType: 'STRING(64)',
      defaultValue: '[]',
      typeView: 'input_select_multiple',
      validate: false
    },
    {
      field: 'icon',
      alias: 'icon',
      dataType: 'STRING(255)',
      defaultValue: 1,
      typeView: 'input_upload',
      validate: false
    },
    {
      field: 'images',
      alias: 'images',
      dataType: 'STRING(1024)',
      defaultValue: 'null',
      typeView: 'input_upload_multiple',
      validate: false
    },
    {
      field: 'shortDescription',
      alias: 'shortDescription',
      dataType: 'STRING(512)',
      defaultValue: null,
      typeView: 'input_simple',
      validate: false
    },
    {
      field: 'description',
      alias: 'description',
      dataType: 'TEXT',
      defaultValue: '',
      typeView: 'input_textarea',
      validate: false
    },
    {
      field: 'contentJson',
      alias: 'contentJson',
      dataType: 'TEXT',
      defaultValue: '',
      typeView: 'input_textarea',
      validate: false
    },
    {
      field: 'view',
      alias: 'view',
      dataType: 'INTEGER',
      defaultValue: null,
      typeView: 'input_simple',
      validate: false
    },
    {
      field: 'status',
      alias: 'status',
      dataType: `ENUM("on", "review", "off")`,
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