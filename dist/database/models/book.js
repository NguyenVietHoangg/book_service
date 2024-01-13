'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
module.exports = function (sequelize, DataTypes) {
  var book = sequelize.define('book', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    }
  }, "adsScript", {
    type: DataTypes.STRING(1024),
    defaultValue: '[]'
  }), "view", {
    type: DataTypes.INTEGER,
    defaultValue: null
  }), "rate", {
    type: DataTypes.INTEGER,
    defaultValue: null
  }), "status", {
    type: DataTypes.ENUM("on", "review", "off"),
    defaultValue: 'review'
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
  book.associate = function (models) {
    // associations can be defined here
  };
  return book;
};