'use strict';

module.exports = function (Sequelize, DataTypes) {
  var tag = Sequelize.define('tag', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    slug: {
      type: DataTypes.STRING(255),
      defaultValue: null
      // unique: true
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
    isStory: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    link: {
      type: DataTypes.STRING(255),
      defaultValue: null
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
  tag.associate = function (models) {
    // associations can be defined here
    tag.belongsToMany(models.story, {
      through: 'tag_has_story'
    });
  };
  return tag;
};