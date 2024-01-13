'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ads', {
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
        unique: true
      },
      description: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      type: {
        type: Sequelize.STRING(255), // loại hình là banner ảnh hay slug
        allowNull: true
      },
      organization: {
        type: Sequelize.STRING(255), // của tổ chức nào
        allowNull: false
      },
      location: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      dimension: {
        type: Sequelize.STRING(100),
        defaultValue: null
      },
      usingIn: {
        type: Sequelize.STRING(255), // home, search, all...
        defaultValue: null
      },
      imageShow: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      adsScript: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      link: {
        type: Sequelize.STRING(500),
        defaultValue: null
      },
      click: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('ads');
  }
};