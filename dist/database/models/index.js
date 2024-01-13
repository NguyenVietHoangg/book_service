'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var fs = require('fs');
var moment = require('moment');
var path = require('path');
var Sequelize = require('sequelize');
var _require = require('./../../config/common'),
  LIMIT = _require.LIMIT;
var highlight = require('cli-highlight').highlight;
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var timezone = require('./../../config/common').TIMEZONE;
var config = require(__dirname + '/../config/config.js')[env];
var db = {};
var dialectOptions = {
  dateStrings: true,
  typeCast: true,
  multipleStatements: true
};
var opts = {
  define: {
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  logging: function logging(log) {
    console.log(highlight(log, {
      language: 'sql',
      ignoreIllegals: true
    }));
  }
};
var sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], _objectSpread(_objectSpread(_objectSpread({}, config), opts), {
    timezone: timezone,
    dialectOptions: dialectOptions
  }));
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, _objectSpread(_objectSpread(_objectSpread({}, config), opts), {
    timezone: timezone,
    dialectOptions: dialectOptions
  }));
}
fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.pager = {
  currentPage: 1,
  perPage: LIMIT,
  segmentPage: 2,
  totalRows: 0,
  totalPage: 0,
  rows: []
};
db.setupInsert = function (data) {
  data.createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
  data.updatedAt = null;
  return data;
};
db.setupUpdate = function (data) {
  data.updatedAt = moment().format('YYYY-MM-DD hh:mm:ss');
  return data;
};
db.getMediaSource = function () {
  var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (!item) {
    item = {
      "id": 1,
      "name": "1674980344-acbcef0f-71f6-4c79-aaf5-50f62f695c5c.png",
      "alt": null,
      "filename": "1674980344-acbcef0f-71f6-4c79-aaf5-50f62f695c5c.png",
      "path": "assets/uploads/2023/01/1674980344-acbcef0f-71f6-4c79-aaf5-50f62f695c5c.png",
      "type": "png",
      "mimetype": "image/png",
      "inside": true,
      "note": "default image",
      "link": "".concat(process.env.MEDIA_URL, "/assets/uploads/2023/01/1674980344-acbcef0f-71f6-4c79-aaf5-50f62f695c5c.png")
    };
  } else {
    item.link = "".concat(process.env.MEDIA_URL, "/").concat(item.path);
    item.url = item.link;
  }
  return item;
};
module.exports = db;