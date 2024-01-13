"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniquesRequire = exports.uniquesItemExam = exports.typeView = exports.typeRelation = exports.tableGenerate = exports.relationRequire = exports.relationItemExam = exports.indexesRequire = exports.indexesItemExam = exports.fieldMainRequire = exports.dataType = void 0;
var tableGenerate = exports.tableGenerate = function tableGenerate(tableName) {
  return {
    name: tableName,
    main: [{
      field: 'name',
      alias: 'name',
      dataType: 'STRING(255)',
      allowNull: false,
      typeView: 'input_simple',
      validate: true
    }, {
      field: 'slug',
      alias: 'slug',
      dataType: 'STRING(255)',
      allowNull: false,
      unique: true,
      typeView: 'input_simple',
      validate: true
    }, {
      field: 'position',
      alias: 'position',
      dataType: 'INTEGER',
      defaultValue: 1,
      typeView: 'input_simple',
      validate: false
    }, {
      field: 'adsScript',
      alias: 'adsScript',
      dataType: 'STRING(1024)',
      defaultValue: '[]',
      typeView: 'input_simple',
      validate: false
    }, {
      field: 'flag',
      alias: 'flag',
      dataType: 'STRING(64)',
      defaultValue: '[]',
      typeView: 'input_select_multiple',
      validate: false
    }, {
      field: 'icon',
      alias: 'icon',
      dataType: 'STRING(255)',
      defaultValue: 1,
      typeView: 'input_upload',
      validate: false
    }, {
      field: 'images',
      alias: 'images',
      dataType: 'STRING(1024)',
      defaultValue: null,
      typeView: 'input_upload_multiple',
      validate: false
    }, {
      field: 'shortDescription',
      alias: 'shortDescription',
      dataType: 'STRING(512)',
      defaultValue: null,
      typeView: 'input_simple',
      validate: false
    }, {
      field: 'description',
      alias: 'description',
      dataType: 'TEXT',
      defaultValue: '',
      typeView: 'input_textarea',
      validate: false
    }, {
      field: 'view',
      alias: 'view',
      dataType: 'INTEGER',
      defaultValue: null,
      typeView: 'input_simple',
      validate: false
    }, {
      field: 'status',
      alias: 'status',
      dataType: "ENUM(\"on\", \"off\")",
      defaultValue: 'on',
      unique: false,
      typeView: 'input_select',
      validate: false
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