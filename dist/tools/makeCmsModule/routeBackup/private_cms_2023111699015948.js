"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _common = _interopRequireDefault(require("./common"));
var _media = _interopRequireDefault(require("./media"));
var _setting = _interopRequireDefault(require("./setting"));
var _category = _interopRequireDefault(require("./category"));
var _collection = _interopRequireDefault(require("./collection"));
var _story = _interopRequireDefault(require("./story"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = [_common["default"], _media["default"], _setting["default"], _category["default"], _collection["default"], _story["default"]];
var _default = exports["default"] = router;