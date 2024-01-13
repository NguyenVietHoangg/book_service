"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validToken = exports.validPermissions = exports.signToken = exports.decodeToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _lodash = _interopRequireDefault(require("lodash"));
var _common = require("../config/common");
var _premissons = require("../config/premissons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var signToken = exports.signToken = function signToken(data) {
  console.log(data);
  return data ? _jsonwebtoken["default"].sign(data, _common.JWT_SECRET, {
    expiresIn: "1h"
  }) : null;
};
var decodeToken = exports.decodeToken = function decodeToken(token) {
  try {
    return _jsonwebtoken["default"].verify(validToken(token), _common.JWT_SECRET) || null;
  } catch (error) {
    console.log("error decodeToken", error);
    return null;
  }
};
var validToken = exports.validToken = function validToken(token) {
  if (!token) {
    return false;
  }
  var tokenSplit = token.split(" ");
  return tokenSplit[0] === "Bearer" && tokenSplit[1] ? tokenSplit[1] : null;
};
var validPermissions = exports.validPermissions = function validPermissions(user) {
  if (!(0, _premissons.permissionGroups)(user)) {
    return false;
  }
  return true;
};