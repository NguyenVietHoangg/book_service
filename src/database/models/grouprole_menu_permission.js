'use strict';
module.exports = (Sequelize, DataTypes) => {
  const grouprole_menu_permission = Sequelize.define('grouprole_menu_permission', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    groupId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    menuId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    permissionId: {
      type: DataTypes.INTEGER,
      defaultValue: null
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
    }
  }, {});
  grouprole_menu_permission.associate = function(models) {
    // associations can be defined here

  };
  return grouprole_menu_permission;
};