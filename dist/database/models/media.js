'use strict';

module.exports = function (Sequelize, DataTypes) {
  var media = Sequelize.define('media', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true
    },
    alt: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true
    },
    filename: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      unique: true
    },
    path: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    mimetype: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    inside: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
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
  media.associate = function (models) {
    // associations can be defined here
    media.belongsToMany(models.story, {
      through: models.media_has_reftable,
      foreignKey: 'mediaId'
    });
    media.hasOne(models.story, {
      foreignKey: 'coverId'
    });
  };
  return media;
};