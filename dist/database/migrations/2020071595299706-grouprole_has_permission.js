'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('grouprole_has_permission', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      groupId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      permissionId: {
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
      uniqueKeys: {
        grouprole_has_permission_20204829_unique: {
          fields: ['groupId', 'permissionId'],
          index: true
        }
      }
    }).then(function () {
      queryInterface.addIndex('grouprole_has_permission', ['groupId', 'permissionId'], {
        unique: false
      });
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('grouprole_has_permission');
  }
};