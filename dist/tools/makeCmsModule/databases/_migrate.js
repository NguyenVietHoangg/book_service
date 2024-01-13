'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('_table_generate_', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      _migrate_content_text: _migrate_content_text,
      updatedBy: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      uniqueKeys: _migrate_uniques_text
    }).then(function () {
      _migrate_indexes_text;
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('_table_generate_');
  }
};