'use strict';
module.exports = (Sequelize, DataTypes) => {
  const story_content = Sequelize.define('story_content', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    storyId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    name: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    nameUnique: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    slugUnique: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true
    },
    story_contentOrder: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    link: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    },
    source_crawler_1: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    source_crawler_2: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    source_crawler_3: {
      type: DataTypes.STRING(255),
      defaultValue: 'null'
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    adsScript: {
      type: DataTypes.STRING(1024),
      defaultValue: '[]'
    },
    flag: {
      type: DataTypes.STRING(64),
      defaultValue: '[]'
    },
    icon: {
      type: DataTypes.STRING(255),
      defaultValue: 1
    },
    images: {
      type: DataTypes.STRING(1024),
      defaultValue: null
    },
    images: {
      type: DataTypes.STRING(1024),
      defaultValue: null
    },
    shortDescription: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    description2: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    view: {
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
  story_content.associate = function(models) {
    // associations can be defined here
    story_content.belongsTo(models.story, { foreignKey: 'storyId', sourceKey: 'id', as: 'story'})
  };
  return story_content;
};