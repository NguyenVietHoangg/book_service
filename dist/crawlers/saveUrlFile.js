"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optimizedImg = exports.listImagesOptimize = exports.imageRandom = exports.fileNameCross = exports["default"] = exports.addTextImage = exports.addLogo = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _makeDir = _interopRequireDefault(require("make-dir"));
var _moment = _interopRequireDefault(require("moment"));
var _imageDownloader = _interopRequireDefault(require("image-downloader"));
var _fs = _interopRequireDefault(require("fs"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jimp = _interopRequireDefault(require("jimp"));
var _resizeOptimizeImages = _interopRequireDefault(require("resize-optimize-images"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
_dotenv["default"].config({
  path: __dirname + '/../../.env'
});
var pathUploads = process.env.FOLDER_UPLOAD_BASE;
var currentTime = (0, _moment["default"])();
var folder = currentTime.format('MM-YYYY');
var _default = exports["default"] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var url,
    fileName,
    path,
    dic,
    options,
    _args = arguments;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        url = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
        fileName = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
        if (url) {
          _context.next = 4;
          break;
        }
        return _context.abrupt("return");
      case 4:
        _context.next = 6;
        return (0, _makeDir["default"])(pathUploads + folder);
      case 6:
        path = _context.sent;
        dic = 'uploads/' + (!fileName ? fileNameCross(url).fileName2 : folder + '/' + fileName);
        options = {
          url: url,
          dest: path
        };
        if (!_fs["default"].existsSync(path + '/' + fileNameCross(url).fileName1)) {
          _imageDownloader["default"].image(options);
        }
        return _context.abrupt("return", dic);
      case 11:
      case "end":
        return _context.stop();
    }
  }, _callee);
}));
var fileNameCross = exports.fileNameCross = function fileNameCross() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (!url) {
    return null;
  }
  var fileName = url.substring(url.lastIndexOf('/') + 1);
  return {
    fileName1: fileName,
    fileName2: folder + '/' + fileName
  };
};
var addLogo = exports.addLogo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var list, i, filename, fileInput, logoInput, _yield$Promise$all, _yield$Promise$all2, image, logo, LOGO_MARGIN_PERCENTAGE, xMargin, yMargin, X, Y, _final;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _makeDir["default"])(pathUploads + folder);
        case 2:
          _context2.next = 4;
          return _fs["default"].readdirSync(pathUploads + 'templates');
        case 4:
          list = _context2.sent;
          i = 0;
        case 6:
          if (!(i < list.length)) {
            _context2.next = 33;
            break;
          }
          filename = list[i];
          fileInput = pathUploads + 'templates/' + filename;
          logoInput = pathUploads + 'logo.png';
          _context2.next = 12;
          return Promise.all([_jimp["default"].read(fileInput), _jimp["default"].read(logoInput)]);
        case 12:
          _yield$Promise$all = _context2.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          image = _yield$Promise$all2[0];
          logo = _yield$Promise$all2[1];
          logo.resize(image.bitmap.width / 3.37, _jimp["default"].AUTO);
          image.resize(200, 300);
          LOGO_MARGIN_PERCENTAGE = 10;
          xMargin = image.bitmap.width * LOGO_MARGIN_PERCENTAGE / 100;
          yMargin = image.bitmap.width * LOGO_MARGIN_PERCENTAGE / 100;
          X = image.bitmap.width - logo.bitmap.width - xMargin;
          Y = image.bitmap.height - logo.bitmap.height - yMargin;
          _context2.next = 25;
          return image.composite(logo, X + 10, Y + 5);
        case 25:
          _final = _context2.sent;
          _context2.next = 28;
          return _final.writeAsync(pathUploads + 'test' + '/' + filename);
        case 28:
          _context2.next = 30;
          return optimizedImg(pathUploads + 'test' + '/' + filename);
        case 30:
          i++;
          _context2.next = 6;
          break;
        case 33:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function addLogo() {
    return _ref2.apply(this, arguments);
  };
}();
var addTextImage = exports.addTextImage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var list, index, filename, fileInput, logoInput, _yield$Promise$all3, _yield$Promise$all4, image, logo, LOGO_MARGIN_PERCENTAGE, xMargin, yMargin, X, Y, _final2;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _makeDir["default"])(pathUploads + folder);
        case 2:
          _context3.next = 4;
          return _fs["default"].readdirSync(pathUploads + 'templates');
        case 4:
          list = _context3.sent;
          index = _lodash["default"].random(list.length);
          filename = list[index];
          fileInput = pathUploads + 'templates/' + filename;
          logoInput = pathUploads + 'logo.png';
          _context3.next = 11;
          return Promise.all([_jimp["default"].read(fileInput), _jimp["default"].read(logoInput)]);
        case 11:
          _yield$Promise$all3 = _context3.sent;
          _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
          image = _yield$Promise$all4[0];
          logo = _yield$Promise$all4[1];
          logo.resize(image.bitmap.width / 3.5, _jimp["default"].AUTO);
          image.resize(200, 300);
          LOGO_MARGIN_PERCENTAGE = 10;
          xMargin = image.bitmap.width * LOGO_MARGIN_PERCENTAGE / 100;
          yMargin = image.bitmap.width * LOGO_MARGIN_PERCENTAGE / 100;
          X = image.bitmap.width - logo.bitmap.width - xMargin;
          Y = image.bitmap.height - logo.bitmap.height - yMargin;
          _context3.next = 24;
          return image.composite(logo, X + 8, Y);
        case 24:
          _final2 = _context3.sent;
          _context3.next = 27;
          return _final2.writeAsync(pathUploads + 'test' + '/' + filename);
        case 27:
          _context3.next = 29;
          return optimizedImg(pathUploads + 'test' + '/' + filename, pathUploads + 'test' + '/' + filename);
        case 29:
          return _context3.abrupt("return", folder + '/' + filename);
        case 30:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function addTextImage() {
    return _ref3.apply(this, arguments);
  };
}();
var imageRandom = exports.imageRandom = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var list, index;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _fs["default"].readdirSync(pathUploads + 'images');
        case 2:
          list = _context4.sent;
          index = _lodash["default"].random(list.length);
          return _context4.abrupt("return", '/uploads/images/' + list[index]);
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function imageRandom() {
    return _ref4.apply(this, arguments);
  };
}();
var listImagesOptimize = exports.listImagesOptimize = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var list;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _fs["default"].readdirSync(pathUploads + 'images');
        case 2:
          list = _context5.sent;
          return _context5.abrupt("return", list);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function listImagesOptimize() {
    return _ref5.apply(this, arguments);
  };
}();
var optimizedImg = exports.optimizedImg = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(pathfile) {
    var pathto,
      options,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          pathto = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : null;
          options = {
            images: [pathfile, pathto ? pathto : pathfile],
            width: 200,
            quality: 90
          };
          _context6.next = 4;
          return (0, _resizeOptimizeImages["default"])(options);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function optimizedImg(_x) {
    return _ref6.apply(this, arguments);
  };
}();