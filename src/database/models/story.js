'use strict';
module.exports = (Sequelize, DataTypes) => {
  const story = Sequelize.define('story', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    slug: {
      type: DataTypes.STRING(255),
      unique: true
    },
    seoTitle: {
      type: DataTypes.STRING(500),
    },
    seoDesc: {
      type: DataTypes.STRING(500),
    },
    seoKeywords: {
      type: DataTypes.STRING(500),
    },
    author: {
      type: DataTypes.STRING(255)
    },
    coverId: {
      type: DataTypes.STRING(512),
    },
    shortDesc: {
      type: DataTypes.TEXT,
    },
    fullDesc: {
      type: DataTypes.TEXT,
    },
    refOutsite: {
      type: DataTypes.STRING(512),
      defaultValue: '{}'
    },
    view: {
      type: DataTypes.INTEGER,
    },
    rate: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    publishedAt: {
      type: DataTypes.DATE
    },
    deletedAt: {
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
  }, {
    timestamps: false
  });
  story.associate = function(models) {
    // associations can be defined here
    story.belongsToMany(models.media, {
      through: models.media_has_reftable,
      foreignKey: 'refTableId'
    })
    story.belongsTo(models.media, {
      foreignKey: 'coverId'
    })
    story.belongsToMany(models.category, {
      through: models.category_has_story,
      foreignKey: 'storyId'
    })
    story.belongsToMany(models.collection, {
      through: models.collection_has_story,
      foreignKey: 'storyId'
    })
    story.belongsToMany(models.tag, {
      through: models.tag_has_story,
      foreignKey: 'storyId'
    })
    story.hasMany(models.category_has_story, {
      foreignKey: 'storyId'
    })
    story.hasMany(models.collection_has_story, {
      foreignKey: 'storyId'
    })
  };
  return story;
};