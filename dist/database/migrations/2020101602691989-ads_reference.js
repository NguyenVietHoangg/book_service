'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('ads_reference', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      adsId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      adsPositionId: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      adsPositionFx: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      dateFrom: {
        allowNull: true,
        type: Sequelize.DATE
      },
      dateTo: {
        allowNull: true,
        type: Sequelize.DATE
      },
      alwayShow: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      behavior: {
        type: Sequelize.ENUM("new_tab", "new_window", "redirect", "open_inapp"),
        defaultValue: "new_tab"
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
    }, {}).then(function () {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('ads_reference');
  }
};