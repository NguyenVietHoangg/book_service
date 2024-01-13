'use strict';
module.exports = (Sequelize, DataTypes) => {
  const ads = Sequelize.define('ads', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    description: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    type: {
      type: DataTypes.STRING(255), // loại hình là banner ảnh hay slug
      allowNull: true
    },
    organization: {
      type: DataTypes.STRING(255), // của tổ chức nào
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    dimension: {
      type: DataTypes.STRING(100),
      defaultValue: null
    },
    usingIn: {
      type: DataTypes.STRING(255), // home, search, all...
      defaultValue: null
    },
    imageShow: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    adsScript: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    link: {
      type: DataTypes.STRING(500),
      defaultValue: null
    },
    click: {
      type: DataTypes.INTEGER,
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
  ads.associate = function(models) {
    // associations can be defined here
    
  };
  return ads;
};