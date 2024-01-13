'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('media_has_reftable', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      mediaId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      refTableId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      refTableName: {
        type: Sequelize.STRING(64),
        defaultValue: 'story'
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
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
    }, {}).then(function () {
      queryInterface.addIndex('media_has_reftable', ['mediaId', 'refTableId', 'refTableName'], {
        unique: true
      });
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('media_has_reftable');
  }
};