'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('book', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      name: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      slug: {
        type: Sequelize.STRING(255),
        defaultValue: null,
        unique: true
      },
      author: {
        type: Sequelize.STRING(255),
        defaultValue: '[]',
        allowNull: true
      },
      resource: {
        type: Sequelize.STRING(64),
        defaultValue: '[]',
        allowNull: true
      },
      origin: {
        type: Sequelize.STRING(64),
        defaultValue: '[]',
        allowNull: true
      },
      categoryListString: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      position: {
        type: Sequelize.INTEGER,
        defaultValue: '1'
      },
      totalPage: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      link: {
        type: Sequelize.STRING(255),
        defaultValue: null,
        allowNull: true
      },
      adsScript: {
        type: Sequelize.STRING(1024),
        defaultValue: '[]'
      },
      state: {
        type: Sequelize.STRING(64),
        defaultValue: 'on'
      },
      flag: {
        type: Sequelize.STRING(64),
        defaultValue: '[]'
      },
      icon: {
        type: Sequelize.STRING(255),
        defaultValue: '1'
      },
      images: {
        type: Sequelize.STRING(1024),
        defaultValue: null
      },
      genre: {
        type: Sequelize.STRING(512),
        defaultValue: null
      },
      shortDescription: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null
      }
    }, "adsScript", {
      type: Sequelize.STRING(1024),
      defaultValue: '[]'
    }), "view", {
      type: Sequelize.INTEGER,
      defaultValue: null
    }), "rate", {
      type: Sequelize.INTEGER,
      defaultValue: null
    }), "status", {
      type: Sequelize.ENUM("on", "review", "off"),
      defaultValue: 'review'
    }), "updatedBy", {
      type: Sequelize.INTEGER,
      defaultValue: null,
      allowNull: true
    }), "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE
    }), "createdAt", {
      allowNull: false,
      type: Sequelize.DATE
    }), "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE
    }), {
      uniqueKeys: {}
    }).then(function () {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('book');
  }
};