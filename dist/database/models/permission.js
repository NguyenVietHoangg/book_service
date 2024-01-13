'use strict';

module.exports = function (Sequelize, DataTypes) {
  var permission = Sequelize.define('permission', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
  permission.associate = function (models) {
    // associations can be defined here
    // grouprole.belongsToMany(models.story, { through: 'grouprole_has_permission', sourceKey: 'id', foreignKey: 'groupId' })
  };
  return permission;
};