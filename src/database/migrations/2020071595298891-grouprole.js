'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('grouprole', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true
      },
      description: {
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
    return queryInterface.dropTable('grouprole');
  }
};