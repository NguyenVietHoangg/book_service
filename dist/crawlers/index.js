"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _publishedNews = _interopRequireDefault(require("./publishedNews"));
var _syncSitemap = _interopRequireDefault(require("./syncSitemap"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = function _default() {
  var time = (0, _moment["default"])().format('HH:mm');
  var hour = (0, _moment["default"])().format('HH');
  var minute = (0, _moment["default"])().format('mm');
  // syncSitemap
  if (parseInt(minute) % 1 === 0) {
    // publishedNews.run()
  }
  // setting syncSitemap
  if (parseInt(minute) % 15 === 0) {
    _syncSitemap["default"].run();
  }
  console.log('=============== RUN syncdata ==============');
  //node_modules/.bin/babel-node src/crawlers/sync.truyentr.org.js getNewestStory
};