'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    name: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    slug: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      unique: true
    },
    author: {
      type: DataTypes.STRING(255),
      defaultValue: '[]',
      allowNull: true
    },
    resource: {
      type: DataTypes.STRING(64),
      defaultValue: '[]',
      allowNull: true
    },
    origin: {
      type: DataTypes.STRING(64),
      defaultValue: '[]',
      allowNull: true
    },
    categoryListString: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: '1'
    },
    totalPage: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    link: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true
    },
    adsScript: {
      type: DataTypes.STRING(1024),
      defaultValue: '[]'
    },
    state: {
      type: DataTypes.STRING(64),
      defaultValue: 'on'
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
    genre: {
      type: DataTypes.STRING(512),
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
    adsScript: {
      type: DataTypes.STRING(1024),
      defaultValue: '[]'
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    rate: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    status: {
      type: DataTypes.ENUM("on", "review", "off"),
      defaultValue: 'review'
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
  book.associate = function(models) {
    // associations can be defined here

  };
  return book;
};