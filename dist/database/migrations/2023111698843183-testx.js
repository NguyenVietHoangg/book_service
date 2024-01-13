'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('testx', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_1: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true
      },
      name_2: {
        type: Sequelize.ENUM("value_1", "value_2", "value_3"),
        defaultValue: 'value_1',
        unique: true
      },
      name_3: {
        type: Sequelize.ENUM("value_1", "value_2", "value_3", "value_4"),
        defaultValue: 'value_4'
      },
      name_4: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      name_5: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      name_6: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      name_7: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      name_8: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      name_9: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      name_10: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      name_11: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      name_12: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      name_13: {
        type: Sequelize.TEXT,
        defaultValue: null
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
      uniqueKeys: {}
    }).then(function () {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('testx');
  }
};