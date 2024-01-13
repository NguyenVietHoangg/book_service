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
      field: 'email',
      alias: 'email',
      dataType: 'STRING(255)',
      allowNull: false,
      typeView: 'input_simple',
      validate: true
    }, {
      field: 'password',
      alias: 'password',
      dataType: 'STRING(255)',
      allowNull: false,
      typeView: 'input_simple',
      validate: true
    }, {
      field: 'avatar',
      alias: 'avatar',
      dataType: 'STRING(255)',
      allowNull: false,
      typeView: 'input_upload',
      validate: true
    }, {
      field: 'images',
      alias: 'images',
      dataType: 'STRING(255)',
      allowNull: false,
      typeView: 'input_upload_multiple',
      validate: true
    }, {
      field: 'type',
      alias: 'type',
      dataType: "ENUM(\"admin\", \"partner\", \"seller\", \"custom\")",
      defaultValue: 'custom',
      unique: false,
      typeView: 'input_select',
      validate: true
    }, {
      field: 'grouproleId',
      alias: 'grouproleId',
      dataType: "INTEGER",
      allowNull: true,
      typeView: 'input_select',
      validate: true
    }, {
      field: 'status',
      alias: 'status',
      dataType: "ENUM(\"locked\", \"pending\", \"opened\")",
      defaultValue: 'opened',
      unique: false,
      typeView: 'input_select',
      validate: true
    }],
    uniques: [],
    indexes: [],
    relation: []
  };
};
var typeView = exports.typeView = ['input_simple', 'input_select', 'input_select_multiple', 'input_checkbox', 'input_radio', 'input_datepicker', 'input_daterange_picker', 'input_datetimerange_picker', 'input_daterange_button', 'input_timepicker', 'input_upload', 'input_upload_multiple', 'input_textarea'];
var dataType = exports.dataType = ['STRING', 'STRING(32)', 'STRING(64)', 'STRING(255)', 'STRING(512)', 'STRING(1024)', 'INTEGER', 'TINYINT', 'ENUM', 'BOOLEAN', 'TEXT', 'TEXT(5000)', 'TEXT(10000)', 'BIGINT', 'DOUBLE', 'REAL', 'DATE'];
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