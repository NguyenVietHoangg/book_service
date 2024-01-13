'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tag', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      slug: {
        type: Sequelize.STRING(255),
        defaultValue: null,
        // unique: true
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
      isStory: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      link: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      position: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      adsScript: {
        type: Sequelize.STRING(1024),
        defaultValue: '[]'
      },
      flag: {
        type: Sequelize.STRING(64),
        defaultValue: '[]'
      },
      view: {
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
    }, {
      uniqueKeys: [],
    }).then(() => {

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tag');
  }
};