'use strict';
module.exports = (Sequelize, DataTypes) => {
  const grouprole = Sequelize.define('grouprole', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true
    },
    description: {
      type: DataTypes.STRING(500),
      defaultValue: null
    },
    type: {
      type: DataTypes.ENUM("root", "admin", "partner", "seller", "custom"),
      defaultValue: 'custom'
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
  grouprole.associate = function(models) {
    //grouprole.belongsToMany(models.permission, { through: 'grouprole_has_permission', sourceKey: 'id', foreignKey: 'groupId' })
    //grouprole.hasMany(models.grouprole_has_permission, { foreignKey: 'groupId' });
  };
  return grouprole;
};