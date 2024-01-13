'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('chapter', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      storyId: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      name: {
        type: Sequelize.STRING(512),
        allowNull: false
      },
      nameUnique: {
        type: Sequelize.STRING(512),
        allowNull: false,
        unique: true
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      slugUnique: {
        type: Sequelize.STRING(512),
        allowNull: false,
        unique: true
      },
      story_contentOrder: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      link: {
        type: Sequelize.STRING(255),
        defaultValue: null,
        allowNull: true
      },
      source_crawler_1: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      source_crawler_2: {
        type: Sequelize.STRING(255),
        defaultValue: null
      },
      source_crawler_3: {
        type: Sequelize.STRING(255),
        defaultValue: 'null'
      },
      position: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      adsScript: {
        type: Sequelize.STRING(1024),
        defaultValue: '[]'
      },
      flag: {
        type: Sequelize.STRING(64),
        defaultValue: '[]'
      },
      icon: {
        type: Sequelize.STRING(255),
        defaultValue: 1
      },
      images: {
        type: Sequelize.STRING(1024),
        defaultValue: null
      }
    }, "images", {
      type: Sequelize.STRING(1024),
      defaultValue: null
    }), "shortDescription", {
      type: Sequelize.TEXT,
      defaultValue: null
    }), "description", {
      type: Sequelize.TEXT,
      defaultValue: null
    }), "description2", {
      type: Sequelize.TEXT,
      defaultValue: null
    }), "view", {
      type: Sequelize.INTEGER,
      defaultValue: null
    }), "status", {
      type: Sequelize.INTEGER,
      defaultValue: 2
    }), "updatedBy", {
      allowNull: true,
      type: Sequelize.INTEGER
    }), "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE
    }), "createdAt", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }), "updatedAt", {
      type: Sequelize.DATE
    }), {
      uniqueKeys: []
    }).then(function () {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('chapter');
  }
};