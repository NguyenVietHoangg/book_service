'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('permission', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      },
      route: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      method: {
        type: Sequelize.ENUM("GET", "HEAD", "POST", "PUST", "DELETE", "CONNECT", "OPTIONS", "TRACE"),
        defaultValue: null,
        allowNull: true
      },
      content: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 2
      },
      updatedBy: {
        allowNull: true,
        type: Sequelize.INTEGER
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
      uniqueKeys: []
    }).then(function () {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('permission');
  }
};