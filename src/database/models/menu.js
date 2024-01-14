'use strict';
module.exports = (Sequelize, DataTypes) => {
  const grouprole = Sequelize.define('menu', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    grouproleId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    
    desc: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    type: {
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
  grouprole.associate = function(models) {
    };
  return grouprole;
};