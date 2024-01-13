'use strict';
module.exports = (Sequelize, DataTypes) => {
  const collection = Sequelize.define('collection', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    parentId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(255),
    },
    slug: {
      type: DataTypes.STRING(255),
      unique: true
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    flag: {
      type: DataTypes.STRING(64),
      defaultValue: null
    },
    coverId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    shortDesc: {
      type: DataTypes.TEXT,
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
    seoKeyword: {
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
    },
    vStatus: {
      type: DataTypes.VIRTUAL,
      get () {
        const status = this.getDataValue('status');
        switch (status) {
          case 1:
            return {name: 'Đang Xuất bản', class: 'bg-success'}
          case 2:
            return {name: 'Bản Nháp', class: 'bg-gray'}
          case 3:
            return {name: 'Chờ Duyệt', class: 'bg-warning'}
          case 4:
            return {name: 'Y/c Sửa Lại', class: 'bg-warning'}
          case 5:
            return {name: 'Đã Duyệt', class: 'bg-success'}
          case 6:
            return {name: 'Đã Tắt', class: 'bg-gray'}
          case 7:
            return {name: 'Đã xóa', class: 'bg-danger'}
          default:
            return {name: 'Không xác định', class: 'bg-gray'}
        }
      }
    }
  }, {});
  collection.associate = function(models) {
    // associations can be defined here
    collection.belongsTo(models.media, {
      foreignKey: 'coverId'
    })
  };
  return collection;
};