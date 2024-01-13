"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _grouprole = _interopRequireDefault(require("./grouprole"));
var _adminstrator = _interopRequireDefault(require("./adminstrator"));
var _permission = _interopRequireDefault(require("./permission"));
var _media = _interopRequireDefault(require("./media"));
var _setting = _interopRequireDefault(require("./setting"));
var _category = _interopRequireDefault(require("./category"));
var _collection = _interopRequireDefault(require("./collection"));
var _story = _interopRequireDefault(require("./story"));
var _chapter = _interopRequireDefault(require("./chapter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = [_grouprole["default"], _adminstrator["default"], _permission["default"], _media["default"], _setting["default"], _category["default"], _collection["default"], _story["default"], _chapter["default"]];
var _default = exports["default"] = router;