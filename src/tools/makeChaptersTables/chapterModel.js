'use strict';
module.exports = (sequelize, DataTypes) => {
  const chapter_table = sequelize.define('chapter_table', {
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
    chapterOrder: {
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
      defaultValue: '1'
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
      type: DataTypes.TEXT('long'),
      defaultValue: null
    },
    description2: {
      type: DataTypes.TEXT('long'),
      defaultValue: null
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    status: {
      type: DataTypes.ENUM("on", "review", "off"),
      defaultValue: 'on'
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  chapter_table.associate = function(models) {
    // associations can be defined here
  };
  return chapter_table;
};