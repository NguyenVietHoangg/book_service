"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissionGroups = void 0;
var _common = require("./common");
var permissionGroups = exports.permissionGroups = function permissionGroups(user) {
  if (!user || !user.role || !_common.ROLES.includes(user.role)) {
    return false;
  }
  switch (user.role) {
    case 'seller':
      sellerPermissions();
      break;
    case 'leader':
      leaderPermissions();
      break;
    case 'manager':
      managerPermissions();
      break;
    case 'root':
      rootPermissions();
      break;
    default:
      break;
  }
  return true;
};
var sellerPermissions = function sellerPermissions() {
  return true;
};
var leaderPermissions = function leaderPermissions() {
  return true;
};
var managerPermissions = function managerPermissions() {
  return true;
};
var rootPermissions = function rootPermissions() {
  return true;
};