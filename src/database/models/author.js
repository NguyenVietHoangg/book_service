'use strict';
module.exports = (Sequelize, DataTypes) => {
  const author = Sequelize.define('author', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    slug: {
      type: DataTypes.STRING(255),
      unique: true
    },
    totalStory: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    avatarId: {
      type: DataTypes.STRING(255),
      defaultValue: 1
    },
    shortDesc: {
      type: DataTypes.STRING(512),
      defaultValue: null
    },
    fullDesc: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    seoTitle: {
      type: DataTypes.STRING(500),
      defaultValue: null
    },
    seoDesc: {
      type: DataTypes.STRING(500),
      defaultValue: null
    },
    seoKeywords: {
      type: DataTypes.STRING(500),
      defaultValue: null
    },
    totalView: {
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
  author.associate = function(models) {
    // associations can be defined here
    author.belongsToMany(models.story, { through: 'author_has_story' })
  };
  return author;
};