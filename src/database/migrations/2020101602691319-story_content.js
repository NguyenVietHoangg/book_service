'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chapter', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      storyId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      name: {
        type: Sequelize.STRING(512),
        allowNull: false
      },
      nameUnique: {
        type: Sequelize.STRING(512),
        allowNull: false,
        unique: true
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      slugUnique: {
        type: Sequelize.STRING(512),
        allowNull: false,
        unique: true
      },
      story_contentOrder: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      link: {
        type: Sequelize.STRING(255),
        defaultValue: null,
        allowNull: true
      },
      source_crawler_1: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      source_crawler_2: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      source_crawler_3: {
        type: Sequelize.STRING(255),
        defaultValue: 'null'
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
      icon: {
        type: Sequelize.STRING(255),
        defaultValue: 1
      },
      images: {
        type: Sequelize.STRING(1024),
        defaultValue: null
      },
      images: {
        type: Sequelize.STRING(1024),
        defaultValue: null
      },
      shortDescription: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      description2: {
        type: Sequelize.TEXT,
        defaultValue: null
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
    return queryInterface.dropTable('chapter');
  }
};