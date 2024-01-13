'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      fullname: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      email: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      password: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      address: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      phone: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      avatar: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      images: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      type: {
        type: Sequelize.INTEGER,
        defaultValue: 3
      },
      grouproleId: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('user');
  }
};