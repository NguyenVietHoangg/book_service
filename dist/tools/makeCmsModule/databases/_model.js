'use strict';

module.exports = function (sequelize, DataTypes) {
  var _table_generate_ = sequelize.define('_table_generate_', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    _model_struct_text: _model_struct_text,
    updatedBy: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  _table_generate_.associate = function (models) {
    // associations can be defined here
    _model_relation_text;
  };
  return _table_generate_;
};