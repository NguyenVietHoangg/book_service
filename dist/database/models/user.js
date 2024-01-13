'use strict';

module.exports = function (Sequelize, DataTypes) {
  var user = Sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    fullname: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    password: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    avatar: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    images: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },
    grouproleId: {
      type: DataTypes.INTEGER,
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
  user.associate = function (models) {
    // associations can be defined here
    // user.belongsTo(models.grouprole, {
    //   foreignKey: 'grouproleId',
    //   sourceKey: 'id',
    //   onDelete: ('CASCADE')
    // })
    user.belongsTo(models.grouprole, {
      foreignKey: 'grouproleId',
      sourceKey: 'id'
    });
  };
  return user;
};