'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('media', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true
      },
      alt: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true
      },
      filename: {
        type: Sequelize.STRING(100),
        defaultValue: null,
        unique: true
      },
      path: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      mimetype: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      inside: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
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
    return queryInterface.dropTable('media');
  }
};