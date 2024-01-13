"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._successMergeJson = exports._successMerge = exports._successJson = exports._success = exports._errorResquestNotFoundJson = exports._errorResquestNotFound = exports._errorOnTryCatchJson = exports._errorOnTryCatch = exports._errorNetworkJson = exports._errorNetwork = exports._errorDataNotFoundJson = exports._errorDataNotFound = exports._errorByHandJSon = exports._errorByHand = void 0;
var _logFile = require("./logFile");
var _typeAlias = require("../config/typeAlias");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _errorNetwork = exports._errorNetwork = function _errorNetwork() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Kết nối mạng có vấn đề vui lòng xem lại";
  return {
    code: 504,
    msg: "".concat(message) || "Kết nối mạng có vấn đề vui lòng xem lại",
    data: null
  };
};
var _errorNetworkJson = exports._errorNetworkJson = function _errorNetworkJson() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Kết nối mạng có vấn đề vui lòng xem lại";
  return JSON.stringify({
    code: 504,
    msg: "".concat(message) || "Kết nối mạng có vấn đề vui lòng xem lại",
    data: null
  });
};
var _errorResquestNotFound = exports._errorResquestNotFound = function _errorResquestNotFound() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Đường dẫn không tồn tại';
  return {
    code: 404,
    msg: message,
    data: null
  };
};
var _errorResquestNotFoundJson = exports._errorResquestNotFoundJson = function _errorResquestNotFoundJson() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Yêu cầu không tồn tại";
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return JSON.stringify({
    code: 404,
    msg: "".concat(message, ", ").concat(url, " kh\xF4ng t\u1ED3n t\u1EA1i"),
    data: null
  });
};
var _errorOnTryCatch = exports._errorOnTryCatch = function _errorOnTryCatch(err, message) {
  _logFile.logger.log("error", err.message);
  return {
    code: 9999,
    msg: message || "C\xF3 l\u1ED7i x\u1EA3y ra, h\xE3y ki\u1EC3m l\u1EA1i th\xF4ng tin",
    data: err,
    "catch": err.message
  };
};
var _errorOnTryCatchJson = exports._errorOnTryCatchJson = function _errorOnTryCatchJson() {
  var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Có lỗi xảy ra, hãy kiểm tra lại thông tin";
  _logFile.logger.log("error", err.message);
  return JSON.stringify({
    code: 9999,
    msg: message || "C\xF3 l\u1ED7i x\u1EA3y ra, h\xE3y ki\u1EC3m l\u1EA1i th\xF4ng tin",
    data: err,
    "catch": err.message
  });
};
var _errorDataNotFound = exports._errorDataNotFound = function _errorDataNotFound() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Dữ liệu không tồn tại";
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    code: 404,
    msg: message || "D\u1EEF li\u1EC7u kh\xF4ng t\u1ED3n t\u1EA1i",
    data: res
  };
};
var _errorDataNotFoundJson = exports._errorDataNotFoundJson = function _errorDataNotFoundJson() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Dữ liệu không tồn tại";
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return JSON.stringify({
    code: 404,
    msg: message || "D\u1EEF li\u1EC7u kh\xF4ng t\u1ED3n t\u1EA1i",
    data: res
  });
};
var _success = exports._success = function _success() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Thành công";
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    code: 0,
    message: message || "Thành công",
    data: res
  };
};
var _successJson = exports._successJson = function _successJson() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Thành công";
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return JSON.stringify({
    code: 0,
    message: message || "Thành công",
    data: res
  });
};
var _successMerge = exports._successMerge = function _successMerge() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Thành công";
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return _objectSpread(_objectSpread({}, {
    code: 0,
    msg: message || "Thành công"
  }), res);
};
var _successMergeJson = exports._successMergeJson = function _successMergeJson() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Thành công";
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return JSON.stringify(_objectSpread(_objectSpread({}, {
    code: 0,
    msg: message || "Thành công"
  }), res));
};
var _errorByHand = exports._errorByHand = function _errorByHand() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Có lỗi xảy ra, vui lòng quay lại sau";
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    code: message === _typeAlias.INVALID_TOKEN ? 401 : 9998,
    msg: message || "C\xF3 l\u1ED7i x\u1EA3y ra, vui l\xF2ng quay l\u1EA1i sau",
    data: res
  };
};
var _errorByHandJSon = exports._errorByHandJSon = function _errorByHandJSon() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Có lỗi xảy ra, vui lòng quay lại sau";
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return JSON.stringify({
    code: message === _typeAlias.INVALID_TOKEN ? 401 : 9998,
    msg: message || "C\xF3 l\u1ED7i x\u1EA3y ra, vui l\xF2ng quay l\u1EA1i sau",
    data: res
  });
};