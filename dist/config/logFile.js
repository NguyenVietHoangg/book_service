"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports["default"] = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PATH_INFO = "".concat(__dirname, "/../logs/infoLog");
var PATH_ERROR = "".concat(__dirname, "/../logs/errorLog");
var options = {
  file: {
    level: 'info',
    name: 'file.info',
    filename: PATH_INFO,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    // 5MB
    maxFiles: 100,
    colorize: true
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: PATH_ERROR,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    // 5MB
    maxFiles: 100,
    colorize: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

// instantiate a new Winston Logger with the settings defined above
var logger = exports.logger = _winston["default"].createLogger({
  transports: [new _winston["default"].transports.Console(options.console), new _winston["default"].transports.File(options.file), new _winston["default"].transports.File(options.errorFile)],
  exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function write(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};
var _default = exports["default"] = logger;