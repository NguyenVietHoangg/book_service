"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniquesRequire = exports.uniquesItemExam = exports.typeView = exports.typeRelation = exports.tableGenerate = exports.relationRequire = exports.relationItemExam = exports.indexesRequire = exports.indexesItemExam = exports.fieldMainRequire = exports.dataType = void 0;
var tableGenerate = exports.tableGenerate = function tableGenerate(tableName) {
  return {
    name: tableName,
    main: [{
      field: 'name_1',
      alias: 'Tên 1 - input_simple',
      dataType: 'STRING',
      allowNull: false,
      unique: true,
      typeView: 'input_simple',
      validate: true
    }, {
      field: 'name_2',
      alias: 'Tên_2 - input_select',
      dataType: "ENUM(\"value_1\", \"value_2\", \"value_3\")",
      defaultValue: 'value_1',
      unique: true,
      typeView: 'input_select',
      validate: true
    }, {
      field: 'name_3',
      alias: 'Tên 3 - input_select_multiple',
      dataType: "ENUM(\"value_1\", \"value_2\", \"value_3\", \"value_4\")",
      defaultValue: 'value_4',
      unique: false,
      typeView: 'input_select_multiple',
      validate: false
    }, {
      field: 'name_4',
      alias: 'Tên 4 - input_checkbox',
      dataType: 'STRING',
      defaultValue: null,
      typeView: 'input_checkbox',
      validate: true
    }, {
      field: 'name_5',
      alias: 'Tên 5 - input_radio',
      dataType: 'STRING',
      defaultValue: null,
      typeView: 'input_radio',
      validate: true
    }, {
      field: 'name_6',
      alias: 'Tên 6 - input_daterange_picker',
      dataType: 'STRING',
      defaultValue: null,
      typeView: 'input_daterange_picker',
      validate: true
    }, {
      field: 'name_7',
      alias: 'Tên 7 - input_datetimerange_picker',
      dataType: 'STRING',
      defaultValue: null,
      typeView: 'input_datetimerange_picker',
      validate: true
    }, {
      field: 'name_8',
      alias: 'Tên 8 - input_daterange_button',
      dataType: 'STRING',
      defaultValue: null,
      typeView: 'input_daterange_button',
      validate: true
    }, {
      field: 'name_9',
      alias: 'Tên 9 - input_timepicker',
      dataType: 'STRING',
      defaultValue: null,
      typeView: 'input_timepicker',
      validate: true
    }, {
      field: 'name_10',
      alias: 'Tên 10 - input_datepicker',
      dataType: 'DATE',
      defaultValue: null,
      typeView: 'input_datepicker',
      validate: true
    }, {
      field: 'name_11',
      alias: 'Tên 11 - input_upload',
      dataType: 'STRING',
      defaultValue: null,
      typeView: 'input_upload',
      validate: true
    }, {
      field: 'name_12',
      alias: 'Tên 12 - input_upload_multiple',
      dataType: 'TEXT',
      defaultValue: '',
      typeView: 'input_upload_multiple',
      validate: true
    }, {
      field: 'name_13',
      alias: 'Tên 13 - input_textarea',
      dataType: 'TEXT',
      defaultValue: '',
      typeView: 'input_textarea',
      validate: true
    }],
    uniques: [],
    indexes: [],
    relation: []
  };
};
var typeView = exports.typeView = ['input_simple', 'input_select', 'input_select_multiple', 'input_checkbox', 'input_radio', 'input_datepicker', 'input_daterange_picker', 'input_datetimerange_picker', 'input_daterange_button', 'input_timepicker', 'input_upload', 'input_upload_multiple', 'input_textarea'];
var dataType = exports.dataType = ['STRING', 'STRING(32)', 'STRING(64)', 'STRING(255)', 'STRING(512)', 'STRING(1024)', 'INTEGER', 'TINYINT', 'BIGINT', 'ENUM', 'BOOLEAN', 'TEXT', 'TEXT(5000)', 'TEXT(10000)', 'BIGINT', 'DOUBLE', 'REAL', 'DATE'];
var typeRelation = exports.typeRelation = ['hasOne', 'hasMany', 'belongTo', 'belongToMany'];
var fieldMainRequire = exports.fieldMainRequire = ['field', 'alias', 'dataType', 'typeView'];
var relationRequire = exports.relationRequire = ['table', 'as', 'foreignKey', 'type'];
var indexesRequire = exports.indexesRequire = ['fields'];
var uniquesRequire = exports.uniquesRequire = ['name', 'fields', 'unique'];
var relationItemExam = exports.relationItemExam = {
  table: 'table_name',
  as: 'table_name',
  foreignKey: 'table_id',
  type: 'hasMany'
};
var uniquesItemExam = exports.uniquesItemExam = {
  name: 'name_unique',
  fields: ['file_a', 'field_b'],
  unique: true
};
var indexesItemExam = exports.indexesItemExam = {
  fields: ['field_a', 'field_b'],
  unique: true
};