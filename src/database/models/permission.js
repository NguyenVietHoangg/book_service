'use strict';
module.exports = (Sequelize, DataTypes) => {
  const permission = Sequelize.define('permission', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    route: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    method: {
      type: DataTypes.ENUM("GET", "HEAD", "POST", "PUST", "DELETE", "CONNECT", "OPTIONS", "TRACE"),
      defaultValue: null,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    updatedBy: {
      allowNull: true,
      type: DataTypes.INTEGER,
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
    },


  }, {});
 // const grouprole_has_permission = require("./grouprole_has_permission")
 
 
 permission.associate = function(models) {
    //associations can be defined here
    //permission.belongsTo(models.grouprole_has_permission, {  foreignKey: 'permissionId' })

  };
  return permission;
};