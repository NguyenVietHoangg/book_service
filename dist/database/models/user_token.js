'use strict';

module.exports = function (Sequelize, DataTypes) {
  var user_token = Sequelize.define('user_token', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    name: {
      type: DataTypes.STRING,
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
  user_token.associate = function (models) {
    // associations can be defined here
  };
  return user_token;
};