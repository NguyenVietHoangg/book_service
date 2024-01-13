'use strict';
module.exports = (Sequelize, DataTypes) => {
  const ads_reference = Sequelize.define('ads_reference', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    adsId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    adsPositionId: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    adsPositionFx: {
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    dateFrom: {
      allowNull: true,
      type: DataTypes.DATE
    },
    dateTo: {
      allowNull: true,
      type: DataTypes.DATE
    },
    alwayShow: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    behavior: {
      type: DataTypes.ENUM("new_tab", "new_window", "redirect", "open_inapp"),
      defaultValue: "new_tab"
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
  ads_reference.associate = function(models) {
    ads_reference.belongsTo(models.ads, { foreignKey: 'adsId', targetId: 'id'})
  };
  return ads_reference;
};