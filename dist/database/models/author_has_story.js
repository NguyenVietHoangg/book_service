'use strict';

module.exports = function (Sequelize, DataTypes) {
  var author_has_story = Sequelize.define('author_has_story', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    storyId: {
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
  author_has_story.associate = function (models) {
    // associations can be defined here
    author_has_story.belongsTo(models.story, {
      foreignKey: 'storyId'
    });
  };
  return author_has_story;
};