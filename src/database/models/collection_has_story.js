'use strict';
module.exports = (Sequelize, DataTypes) => {
  const collection_has_story = Sequelize.define('collection_has_story', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    collectionId: {
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
  collection_has_story.associate = function(models) {
    // associations can be defined here
    collection_has_story.belongsTo(models.story, { foreignKey: 'storyId'})
    collection_has_story.belongsTo(models.collection, { foreignKey: 'collectionId'})
  };
  return collection_has_story;
};