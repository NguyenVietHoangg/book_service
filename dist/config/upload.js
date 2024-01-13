"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.getPath = exports.checkPath = void 0;
var _common = require("../helpers/common");
var _multer = _interopRequireDefault(require("multer"));
var _fs = _interopRequireDefault(require("fs"));
var eResponse = _interopRequireWildcard(require("./../config/eResponse"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var getPath = exports.getPath = function getPath() {
  return {
    FOLDER_UPLOAD_BASE: process.env.FOLDER_UPLOAD_BASE ? process.env.FOLDER_UPLOAD_BASE : 'uploads',
    PATH_UPLOAD: "uploads/user-".concat(global.user.id),
    PATH_MOVE_TO: "uploads/user-".concat(global.user.id, "/").concat((0, _common.getQuarter)())
  };
};
var upload = exports.upload = function upload(data) {
  var store = _multer["default"].diskStorage({
    destination: function destination(req, file, cb) {
      cb(null, getPath().PATH_UPLOAD);
    },
    filename: function filename(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var uploadConfig = (0, _multer["default"])({
    storage: store
  });
  return uploadConfig;
};
var checkPath = exports.checkPath = function checkPath(req, res, next) {
  try {
    if (!_fs["default"].existsSync(getPath().PATH_MOVE_TO)) {
      _fs["default"].mkdirSync(getPath().PATH_MOVE_TO, {
        recursive: true
      });
    }
    next();
  } catch (err) {
    return eResponse._errorOnTryCatch(err);
  }
};