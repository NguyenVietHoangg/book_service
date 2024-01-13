"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config('../../../.env');
var configdb = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOSTNAME || 'localhost',
    port: process.env.DEV_DB_PORT || 3306,
    dialect: process.env.DB_DIALECT
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_DB_HOSTNAME || 'localhost',
    port: process.env.CI_DB_PORT || 3306,
    dialect: process.env.DB_DIALECT
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME || 'localhost',
    port: process.env.PROD_DB_PORT || 3306,
    dialect: process.env.DB_DIALECT
  }
};
module.exports = configdb;