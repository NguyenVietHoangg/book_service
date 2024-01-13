'use strict';

module.exports = function (Sequelize, DataTypes) {
  var category_has_story = Sequelize.define('category_has_story', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    storyId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    categoryParentId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    updatedBy: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  category_has_story.associate = function (models) {
    // associations can be defined here
    category_has_story.belongsTo(models.story, {
      foreignKey: 'storyId'
    });
    category_has_story.belongsTo(models.category, {
      foreignKey: 'categoryId'
    });
  };
  return category_has_story;
};