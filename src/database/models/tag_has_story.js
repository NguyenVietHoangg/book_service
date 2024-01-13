'use strict';
module.exports = (Sequelize, DataTypes) => {
  const tag_has_story = Sequelize.define('tag_has_story', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tagId: {
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
      type: DataTypes.INTEGER,
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
  tag_has_story.associate = function(models) {
    // associations can be defined here
    tag_has_story.belongsTo(models.story, { foreignKey: 'storyId'})
    tag_has_story.belongsTo(models.tag, { foreignKey: 'tagId'})
  };
  return tag_has_story;
};