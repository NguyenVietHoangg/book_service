'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_token', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true
      },
      userId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: null
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
    }, {
      uniqueKeys: [],
    }).then(() => {

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_token');
  }
};