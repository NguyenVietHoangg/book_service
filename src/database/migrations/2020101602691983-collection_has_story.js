'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('collection_has_story', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      collectionId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      storyId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      type: {
        type: Sequelize.INTEGER,
        defaultValue: 1
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
      queryInterface.addIndex('collection_has_story', ['collectionId', 'storyId'], {
        unique: true
      })

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('collection_has_story');
  }
};