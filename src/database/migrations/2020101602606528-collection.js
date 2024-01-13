'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('collection', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      parentId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255),
      },
      slug: {
        type: Sequelize.STRING(255),
        unique: true
      },
      position: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      flag: {
        type: Sequelize.STRING(64),
        defaultValue: null
      },
      coverId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      shortDesc: {
        type: Sequelize.TEXT,
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
      seoKeyword: {
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
    return queryInterface.dropTable('collection');
  }
};