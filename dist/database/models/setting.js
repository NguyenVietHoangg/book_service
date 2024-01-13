'use strict';

module.exports = function (Sequelize, DataTypes) {
  var setting = Sequelize.define('setting', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    updatedBy: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  setting.associate = function (models) {
    // associations can be defined here
  };
  return setting;
};