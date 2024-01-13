'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('setting', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true,
        allowNull: true
      },
      icon: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true,
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT,
        defaultValue: null
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
    return queryInterface.dropTable('setting');
  }
};