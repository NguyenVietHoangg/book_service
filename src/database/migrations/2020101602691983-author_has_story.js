'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('author_has_story', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      authorId: {
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
    }, {}).then(() => {
      queryInterface.addIndex('author_has_story', ['authorId', 'storyId'], {
        unique: true
      })

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('author_has_story');
  }
};