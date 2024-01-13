'use strict';
module.exports = (Sequelize, DataTypes) => {
  const media_has_reftable = Sequelize.define('media_has_reftable', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mediaId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    refTableId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    refTableName: {
      type: DataTypes.STRING(64),
      defaultValue: 'story'
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
  media_has_reftable.associate = function(models) {
    // associations can be defined here
    media_has_reftable.belongsTo(models.story, { foreignKey: 'refTableId'})
    media_has_reftable.belongsTo(models.media, { foreignKey: 'mediaId'})
  };
  return media_has_reftable;
};