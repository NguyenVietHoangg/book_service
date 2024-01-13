'use strict';

module.exports = function (sequelize, DataTypes) {
  var testx = sequelize.define('testx', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name_1: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true
    },
    name_2: {
      type: DataTypes.ENUM("value_1", "value_2", "value_3"),
      defaultValue: 'value_1',
      unique: true
    },
    name_3: {
      type: DataTypes.ENUM("value_1", "value_2", "value_3", "value_4"),
      defaultValue: 'value_4'
    },
    name_4: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    name_5: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    name_6: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    name_7: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    name_8: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    name_9: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    name_10: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    name_11: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    name_12: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    name_13: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
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
  testx.associate = function (models) {
    // associations can be defined here
  };
  return testx;
};