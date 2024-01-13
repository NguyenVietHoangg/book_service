"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _moment = _interopRequireDefault(require("moment"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _expressListEndpoints = _interopRequireDefault(require("express-list-endpoints"));
var _redis = require("redis");
var _expressSanitizer = _interopRequireDefault(require("express-sanitizer"));
var _cron = _interopRequireDefault(require("cron"));
var _connectTimeout = _interopRequireDefault(require("connect-timeout"));
var _common = require("./middlewares/common");
var _cms = _interopRequireDefault(require("./routes/cms"));
var _client = _interopRequireDefault(require("./routes/client"));
var _user = _interopRequireDefault(require("./routes/user"));
var _cache = _interopRequireDefault(require("./cache"));
var _common2 = require("./config/common");
var _logFile = _interopRequireDefault(require("./config/logFile"));
var _authCms = _interopRequireDefault(require("./middlewares/authCms"));
var _setting = _interopRequireDefault(require("./middlewares/setting"));
var _handleInputs = _interopRequireDefault(require("./middlewares/handleInputs"));
var _syncPermission = require("./helpers/syncPermission");
var _constant = _interopRequireDefault(require("./config/constant"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import crontab from './crontab'

var RedisStore = require("connect-redis")(_expressSession["default"]);
var redis = (0, _redis.createClient)({
  host: process.env.DEV_CACHE_HOST,
  port: process.env.DEV_CACHE_PORT,
  ttl: 86400
});
_dotenv["default"].config({
  path: "".concat(__dirname, "/.env")
});
_moment["default"].tz.setDefault(_common2.TIMEZONE);
_moment["default"].locale("vi");

// chạy job lấy dữ liệu
// const job = new cron.CronJob({
//   cronTime: '* * * * *', // Chạy Jobs vào 2h30 hằng đêm
//   onTick: function() {
//     crontab()
//     console.log('Cron jub runing cronjob ...');
//   },
//   start: true,
//   timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng
// });
// job.start();

var app = (0, _express["default"])();
app.use((0, _connectTimeout["default"])("5s"));
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use((0, _cors["default"])());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(_express["default"]["static"]("public"));

// set .html as the default extension
// app.set('view engine', 'html');
// app.set('views', __dirname + '/src/views');

app.set("views", "./src/views");
app.set("view engine", "pug");
app.use((0, _morgan["default"])("combined", {
  stream: _logFile["default"].stream
}));
app.use(_express["default"].json({
  limit: "50mb"
}));
app.use(_express["default"].urlencoded({
  limit: "50mb",
  extended: true
}));
app.use((0, _expressSanitizer["default"])());
app.use((0, _cookieParser["default"])());
app.use(_common.timeLog);
app.use("/cms", _cms["default"]);
app.use("/client", _handleInputs["default"], _client["default"]);
app.use("/", _user["default"]);

// reload all routers
var isReloadEndpoint = _cache["default"].get(_common2.RELOAD_ALL_ROUTERS_CMS);
if (isReloadEndpoint || 1 === 1) {
  var listRouters = (0, _expressListEndpoints["default"])(app);
  console.log("listRouters show:", JSON.stringify(listRouters));
  (0, _syncPermission.syncPermissions)(listRouters);
}
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
  if (!req.timedout) {
    next();
  }
}
var _default = exports["default"] = app;