'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      name: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      slug: {
        type: Sequelize.STRING(255),
        defaultValue: null,
        unique: true
      },
      author: {
        type: Sequelize.STRING(255),
        defaultValue: '[]',
        allowNull: true
      },
      resource: {
        type: Sequelize.STRING(64),
        defaultValue: '[]',
        allowNull: true
      },
      origin: {
        type: Sequelize.STRING(64),
        defaultValue: '[]',
        allowNull: true
      },
      categoryListString: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      position: {
        type: Sequelize.INTEGER,
        defaultValue: '1'
      },
      totalPage: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      link: {
        type: Sequelize.STRING(255),
        defaultValue: null,
        allowNull: true
      },
      adsScript: {
        type: Sequelize.STRING(1024),
        defaultValue: '[]'
      },
      state: {
        type: Sequelize.STRING(64),
        defaultValue: 'on'
      },
      flag: {
        type: Sequelize.STRING(64),
        defaultValue: '[]'
      },
      icon: {
        type: Sequelize.STRING(255),
        defaultValue: '1'
      },
      images: {
        type: Sequelize.STRING(1024),
        defaultValue: null
      },
      genre: {
        type: Sequelize.STRING(512),
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
      adsScript: {
        type: Sequelize.STRING(1024),
        defaultValue: '[]'
      },
      view: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      rate: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      status: {
        type: Sequelize.ENUM("on", "review", "off"),
        defaultValue: 'review'
      },
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
      uniqueKeys: {

      },
    }).then(() => {

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('book');
  }
};