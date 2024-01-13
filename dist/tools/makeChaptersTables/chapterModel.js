'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
module.exports = function (sequelize, DataTypes) {
  var chapter_table = sequelize.define('chapter_table', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    }
  }, "images", {
    type: DataTypes.STRING(1024),
    defaultValue: null
  }), "shortDescription", {
    type: DataTypes.TEXT,
    defaultValue: null
  }), "description", {
    type: DataTypes.TEXT('long'),
    defaultValue: null
  }), "description2", {
    type: DataTypes.TEXT('long'),
    defaultValue: null
  }), "view", {
    type: DataTypes.INTEGER,
    defaultValue: null
  }), "status", {
    type: DataTypes.ENUM("on", "review", "off"),
    defaultValue: 'on'
  }), "updatedBy", {
    type: DataTypes.INTEGER,
    defaultValue: null,
    allowNull: true
  }), "deletedAt", {
    allowNull: true,
    type: DataTypes.DATE
  }), "createdAt", {
    allowNull: false,
    type: DataTypes.DATE
  }), "updatedAt", {
    allowNull: false,
    type: DataTypes.DATE
  }), {});
  chapter_table.associate = function (models) {
    // associations can be defined here
  };
  return chapter_table;
};