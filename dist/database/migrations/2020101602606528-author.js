'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('author', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(255)
      },
      slug: {
        type: Sequelize.STRING(255),
        unique: true
      },
      totalStory: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      avatarId: {
        type: Sequelize.STRING(255),
        defaultValue: 1
      },
      shortDesc: {
        type: Sequelize.STRING(512),
        defaultValue: null
      },
      fullDesc: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      seoTitle: {
        type: Sequelize.STRING(500),
        defaultValue: null
      },
      seoDesc: {
        type: Sequelize.STRING(500),
        defaultValue: null
      },
      seoKeywords: {
        type: Sequelize.STRING(500),
        defaultValue: null
      },
      totalView: {
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
    }, {
      uniqueKeys: []
    }).then(function () {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('author');
  }
};