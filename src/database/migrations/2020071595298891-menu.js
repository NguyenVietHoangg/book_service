'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menu', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      grouproleId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true
      },
      parentMenuId:{
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true
      },
      icon: {
        type: Sequelize.STRING(500),
        defaultValue: null
      },
      url: {
        type: Sequelize.STRING(500),
        defaultValue: null
      },
      type: {
        type: Sequelize.INTEGER,
        defaultValue: 3
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 2
      },
      updatedBy: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }, 
    {
      uniqueKeys: [],
    }).then(() => {

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('menu');
  }
};