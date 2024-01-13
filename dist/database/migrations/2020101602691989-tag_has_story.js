'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('tag_has_story', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tagId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      storyId: {
        type: Sequelize.INTEGER,
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
    }, {}).then(function () {
      queryInterface.addIndex('tag_has_story', ['tagId', 'storyId'], {
        unique: true
      });
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('tag_has_story');
  }
};