'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('story', {
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
      seoTitle: {
        type: Sequelize.STRING(500)
      },
      seoDesc: {
        type: Sequelize.STRING(500)
      },
      seoKeywords: {
        type: Sequelize.STRING(500)
      },
      author: {
        type: Sequelize.STRING(255)
      },
      coverId: {
        type: Sequelize.STRING(512)
      },
      shortDesc: {
        type: Sequelize.TEXT
      },
      fullDesc: {
        type: Sequelize.TEXT
      },
      refOutsite: {
        type: Sequelize.STRING(512),
        defaultValue: '{}'
      },
      view: {
        type: Sequelize.INTEGER
      },
      rate: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 2
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      updatedBy: {
        type: Sequelize.INTEGER
      },
      publishedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
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
      indexes: [
      // Create a unique index on email
      {
        fields: ['postTo', 'linkPostTo'],
        unique: true
      }],
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    }).then(function () {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('story');
  }
};