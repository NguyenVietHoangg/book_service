"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIMEZONE = exports.SALT_PASSWORD = exports.RELOAD_ALL_ROUTERS_CMS = exports.PREFIX = exports.LIMIT_MIN = exports.LIMIT_MAX = exports.LIMIT = exports.JWT_SECRET = exports.JWT_EXPIRED = exports.ENABLE_TEMPLATE_FULL = exports.ENABLE_CACHE = exports.CACHE_TAG_CLIENT = exports.CACHE_STORY = exports.CACHE_SEARCH_CLIENT = exports.CACHE_MENU_WEB_CONFIG = exports.CACHE_HOME_CLIENT = exports.CACHE_DETAIL_STORY_CLIENT = exports.CACHE_DETAIL_STORY = exports.CACHE_DETAIL_COLLECTION = exports.CACHE_DETAIL_CATEGORY = exports.CACHE_CONFIG = exports.CACHE_COLLECTION = exports.CACHE_CATEGORY_CLIENT = exports.CACHE_CATEGORY = exports.CACHE_ADMIN_CONFIG = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config({
  path: "".concat(__dirname, "/../../.env")
});
var PREFIX = exports.PREFIX = process.env.PREFIX_WEB_CACHE;
var RELOAD_ALL_ROUTERS_CMS = exports.RELOAD_ALL_ROUTERS_CMS = PREFIX + '_RELOAD_ALL_ROUTERS_CMS';
var ENABLE_CACHE = exports.ENABLE_CACHE = true;
var ENABLE_TEMPLATE_FULL = exports.ENABLE_TEMPLATE_FULL = true;
var SALT_PASSWORD = exports.SALT_PASSWORD = 'Sars-covid-19';
var TIMEZONE = exports.TIMEZONE = '+07:00';
var JWT_SECRET = exports.JWT_SECRET = 'cmsgo746@#18';
var JWT_EXPIRED = exports.JWT_EXPIRED = 2592000; // 30 days
var LIMIT = exports.LIMIT = 20;
var LIMIT_MAX = exports.LIMIT_MAX = 50000;
var LIMIT_MIN = exports.LIMIT_MIN = 2;

// danh sách case dùng để cache dữ liệu
var CACHE_ADMIN_CONFIG = exports.CACHE_ADMIN_CONFIG = PREFIX + '_ADMIN_CONFIG';
var CACHE_MENU_WEB_CONFIG = exports.CACHE_MENU_WEB_CONFIG = PREFIX + '_CACHE_MENU_WEB_CONFIG';
var CACHE_CONFIG = exports.CACHE_CONFIG = PREFIX + '_CACHE_CONFIG';
var CACHE_STORY = exports.CACHE_STORY = PREFIX + '_CACHE_APP_STORY';
var CACHE_DETAIL_STORY = exports.CACHE_DETAIL_STORY = PREFIX + '_CACHE_APP_DEATIL_STORY';
var CACHE_CATEGORY = exports.CACHE_CATEGORY = PREFIX + '_CACHE_APP_CATEGORY';
var CACHE_DETAIL_CATEGORY = exports.CACHE_DETAIL_CATEGORY = PREFIX + '_CACHE_APP_DETAIL_CATEGORY';
var CACHE_COLLECTION = exports.CACHE_COLLECTION = PREFIX + '_CACHE_COLLECTION';
var CACHE_DETAIL_COLLECTION = exports.CACHE_DETAIL_COLLECTION = PREFIX + '_CACHE_DEAIL_COLLECTION';
var CACHE_HOME_CLIENT = exports.CACHE_HOME_CLIENT = PREFIX + '_CACHE_HOME_CLIENT';
var CACHE_CATEGORY_CLIENT = exports.CACHE_CATEGORY_CLIENT = PREFIX + '_CACHE_CATEGORY_CLIENT';
var CACHE_DETAIL_STORY_CLIENT = exports.CACHE_DETAIL_STORY_CLIENT = PREFIX + '_CACHE_DETAIL_STORY_CLIENT';
var CACHE_TAG_CLIENT = exports.CACHE_TAG_CLIENT = PREFIX + '_CACHE_TAG_CLIENT';
var CACHE_SEARCH_CLIENT = exports.CACHE_SEARCH_CLIENT = PREFIX + '_CACHE_SEARCH_CLIENT';