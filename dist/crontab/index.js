"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _syncSitemap = _interopRequireDefault(require("./syncSitemap"));
var _publishedNews = _interopRequireDefault(require("./publishedNews"));
var _settingCrawler = _interopRequireDefault(require("./../crawlers/settingCrawler"));
var _syncAllToStory = require("./../webServices/syncAllToStory");
var _sync = _interopRequireDefault(require("./../crawlers/sync.common"));
var _storyService = _interopRequireDefault(require("./../webServices/storyService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = function _default() {
  var time = (0, _moment["default"])().format('HH:mm');
  var hour = (0, _moment["default"])().format('HH');
  var minute = (0, _moment["default"])().format('mm');
  if (parseInt(hour) % 5 == 0) {
    console.log('=============================== syncAllContentRef ================================');
    // syncAllContentRef(100)
    // storyService.totalDashboard()
  }
  // syncPublish
  // publishedNews.run()
  if (parseInt(minute) == 50 && hour % 2 == 0) {
    console.log('=============================== syncAllContentRef ================================');
    // syncAllContentRef(100)
    // storyService.totalDashboard()
    // settingCrawler.syncChapterNull()
  }
  // setting sitemap
  if (minute == 30 && hour % 4 == 0) {
    console.log('=============================== syncNewest ================================');
    // settingCrawler.syncNewest()
  }
  if (minute % 5 == 0) {
    // settingCrawler.syncChapterNull()
  }
  if (minute == 50 && hour % 2 == 1) {
    console.log('=============================== syncNewest ================================');
    // settingCrawler.syncStoryTotalChapterZero()
    // settingCrawler.syncNewest()
  }
  if (minute == 59) {
    console.log('=============================== syncNewest syncNewestFromDb ================================');
    // settingCrawler.syncNewestFromDb()
  }
  if (time == '08:00') {
    _syncSitemap["default"].run();
  }
  if (time == '01:30') {
    // settingCrawler.syncSites();
    console.log('=============================== syncNewest ================================');
    // settingCrawler.syncNewest()
  }
  if (time == '03:00') {
    console.log('=============================== syncNewest syncNewestFromDb ================================');
    // settingCrawler.syncNewestFromDb()
    // syncCommon.updateTotalStory()
  }
  if (time == 20 && hour % 3 == 0) {
    console.log('=============================== syncNewest syncAllContentRef ================================');
    // syncAllContentRef(1000)
    // syncCommon.syncChapterNewest()
  }
  console.log('=============== RUN syncdata ==============');
};