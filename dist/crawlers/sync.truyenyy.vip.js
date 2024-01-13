"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _shelljs = _interopRequireDefault(require("shelljs"));
var _config = _interopRequireDefault(require("./config"));
var _saveUrlFile = require("./saveUrlFile");
var Model = _interopRequireWildcard(require("../database/models"));
var _common = require("../helpers/common");
var _sync = require("./sync.common");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var PREFIX_SOURCE = 'truyenyy.vip';
// lấy thông tin chi tiết của một truyện
var getStoryDetail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
    var storyId,
      selector,
      result,
      x,
      storyName,
      author,
      images,
      genre,
      resource,
      crawlerFrom,
      state,
      shortDescription,
      slugStory,
      imageSave,
      story,
      obj,
      storySave,
      totalScan,
      _yield$Model$chapter$,
      count,
      startI,
      chapters,
      step,
      i,
      urlChuong,
      chapterObj,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          storyId = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
          if (url) {
            _context.next = 4;
            break;
          }
          url = 'https://truyenyy.vip/truyen/dai-mong-chu/';
          return _context.abrupt("return");
        case 4:
          selector = null;
          _context.prev = 5;
          _context.next = 8;
          return _config["default"].loadCheerio(url);
        case 8:
          selector = _context.sent;
          _context.next = 15;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](5);
          console.log('error', _context.t0);
          return _context.abrupt("return", false);
        case 15:
          _context.next = 17;
          return (0, _sync.removeRefStory)(storyId);
        case 17:
          result = selector('.content'); // return
          x = selector('head').find('meta[property="og:title"]').attr('content').split('-');
          storyName = x[0].trim();
          return _context.abrupt("return");
        case 31:
          imageSave = _context.sent;
          _context.next = 34;
          return Model['story'].findOne({
            attributes: ['id', 'slug', 'crawlerFrom'],
            where: {
              slug: (0, _common.convertSlugStory)(slugStory)
            }
          });
        case 34:
          story = _context.sent;
          if (!story) {
            _context.next = 38;
            break;
          }
          _context.next = 38;
          return Model['chapter'].update({
            updatedAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss'),
            crawlerFrom: PREFIX_SOURCE
          }, {
            where: {
              storyId: story.id
            }
          });
        case 38:
          obj = {
            name: storyName,
            slug: (0, _common.convertSlugStory)(slugStory),
            link: url,
            source_crawler_1: url,
            images: images,
            imageSave: imageSave,
            author: author,
            genre: genre,
            resource: resource,
            state: state,
            rate: 9.5,
            shortDescription: shortDescription,
            paginate: null,
            listPageChapter: null,
            status: 'on',
            totalPage: null,
            haveChapterContent: 1,
            crawlerFrom: crawlerFrom,
            totalChapter: null,
            createdAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss')
          };
          storySave = null;
          _context.prev = 40;
          if (story) {
            _context.next = 47;
            break;
          }
          _context.next = 44;
          return Model['story'].create(obj);
        case 44:
          _context.t1 = _context.sent;
          _context.next = 48;
          break;
        case 47:
          _context.t1 = story;
        case 48:
          storySave = _context.t1;
          _context.next = 55;
          break;
        case 51:
          _context.prev = 51;
          _context.t2 = _context["catch"](40);
          console.log('=> error save story:' + url, _context.t2);
          return _context.abrupt("return", false);
        case 55:
          _context.next = 57;
          return (0, _sync.updateStoryToCategory)(storySave.id, obj.genre);
        case 57:
          _context.next = 59;
          return (0, _sync.updateTotalChapter)(storySave.id);
        case 59:
          _context.next = 61;
          return Model['story'].findOne({
            attributes: ['id', 'slug', 'crawlerFrom'],
            where: {
              id: storySave.id
            }
          });
        case 61:
          storySave = _context.sent;
          // lấy content tường chương
          totalScan = 3000;
          _context.next = 65;
          return Model['chapter'].findAndCountAll({
            attributes: ['id'],
            where: {
              storyId: storySave.id
            },
            limit: 1
          });
        case 65:
          _yield$Model$chapter$ = _context.sent;
          count = _yield$Model$chapter$.count;
          startI = Math.floor(count / 50) || 1;
          chapters = [];
          step = 50;
          i = startI;
        case 71:
          if (!(i < 3000)) {
            _context.next = 84;
            break;
          }
          urlChuong = 'https://truyenyy.vip/truyen/' + slugStory + '/chuong-' + i + '.html';
          _context.next = 75;
          return getChapter(urlChuong, (0, _common.convertSlugStory)(slugStory), i);
        case 75:
          chapterObj = _context.sent;
          if (chapterObj) {
            chapters.push(chapterObj);
          }
          if (!(chapters.length === step || i === 2999)) {
            _context.next = 81;
            break;
          }
          _context.next = 80;
          return Model.chapter.bulkCreate(chapters, {
            ignoreDuplicates: true
          });
        case 80:
          chapters = [];
        case 81:
          i++;
          _context.next = 71;
          break;
        case 84:
          setTimeout(function () {
            (0, _sync.updateTotalChapter)(storySave.id);
            (0, _sync.itemSyncChapterNewest)(storySave.id);
          }, 500);
          console.log("=============================", storySave.id);
          console.log('xong getStoryDetail !!!!!!!!!!!!!!: ' + url);
          return _context.abrupt("return", true);
        case 88:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 11], [40, 51]]);
  }));
  return function getStoryDetail(_x) {
    return _ref.apply(this, arguments);
  };
}();

// lấy dữ liệu của từng chương
var getChapter = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(link, storyId, slugStory) {
    var chapterOrder,
      selector,
      chapterName,
      chapter,
      arr,
      arrDescription,
      objChapter,
      chapterDetail,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          chapterOrder = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : null;
          if (!(!link || !storyId || !slugStory)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", null);
        case 3:
          selector = null;
          _context2.prev = 4;
          _context2.next = 7;
          return _config["default"].loadCheerio(link);
        case 7:
          selector = _context2.sent;
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](4);
          console.log('=> error crawler chapter: ' + link, _context2.t0);
          return _context2.abrupt("return", false);
        case 14:
          chapterName = (0, _common.clearUnicode)(selector('.box').find('h1').text());
          chapter = selector('#inner_chap_content_1').find('p');
          arr = chapter.map(function (index, el) {
            return selector(el).text();
          }).get();
          arrDescription = arr;
          objChapter = {
            storyId: storyId,
            name: chapterName,
            slug: (0, _common.xoaDau)(chapterName),
            slugUnique: slugStory + '-atruyenhay-' + (0, _common.xoaDau)(chapterName),
            nameUnique: slugStory + '-atruyenhay-' + (0, _common.xoaDau)(chapterName),
            link: link,
            source_crawler_1: link,
            description: (0, _common.clearUnicode)(arrDescription.join('<br />')).replace('http://ｔruyencuatui.Net', 'truyenfullonline.com').replace('truyenyy', 'truyenfullonline'),
            description2: (0, _common.clearUnicode)(JSON.stringify(arrDescription)),
            chapterOrder: chapterOrder,
            status: 'on',
            createdAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss')
          };
          return _context2.abrupt("return", objChapter);
        case 22:
          chapterDetail = _context2.sent;
          if (!chapterDetail) {
            _context2.next = 27;
            break;
          }
          _context2.next = 26;
          return Model['chapter'].update({
            description: objChapter.description,
            description2: objChapter.description2,
            updatedAt: chapterDetail.updatedAt
          }, {
            where: {
              id: chapterDetail.id
            }
          });
        case 26:
          return _context2.abrupt("return", false);
        case 27:
          _context2.prev = 27;
          _context2.next = 30;
          return Model['chapter'].create(objChapter);
        case 30:
          _context2.next = 35;
          break;
        case 32:
          _context2.prev = 32;
          _context2.t1 = _context2["catch"](27);
          console.log('=> error save chapter:' + link, _context2.t1);
        case 35:
          return _context2.abrupt("return", true);
        case 36:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 10], [27, 32]]);
  }));
  return function getChapter(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// lấy link của thể loại truyện
var getLinkInCategory = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var link,
      selector,
      result,
      links,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          link = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
          _context3.next = 3;
          return _config["default"].loadCheerio(link);
        case 3:
          selector = _context3.sent;
          result = selector('.col-truyen-main .col-xs-7 h3.truyen-title').find('a');
          links = result.map(function (index, el) {
            return selector(el).attr('href');
          }).get();
          return _context3.abrupt("return", links.reverse());
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getLinkInCategory() {
    return _ref3.apply(this, arguments);
  };
}();

// cập nhật truyện mới từ truyện full
var getNewestStory = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var i, endpoint, links;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          i = 4;
        case 1:
          if (!(i >= 1)) {
            _context4.next = 18;
            break;
          }
          endpoint = 'https://truyenyy.vip/danh-sach/truyen-moi/trang-' + i;
          links = null;
          _context4.prev = 4;
          _context4.next = 7;
          return getLinkInCategory(endpoint);
        case 7:
          links = _context4.sent;
          _context4.next = 14;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](4);
          console.log('=> error getLinkInCategory:' + endpoint, _context4.t0);
          return _context4.abrupt("continue", 15);
        case 14:
          links.map(function (item) {
            return getStoryDetail(item);
          });
        case 15:
          i--;
          _context4.next = 1;
          break;
        case 18:
          console.log('xong getNewestStory !!!!!!!!!!!!!!: ');
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 10]]);
  }));
  return function getNewestStory() {
    return _ref4.apply(this, arguments);
  };
}();

// cập nhật truyện hoàn thành từ truyenfull
var getFullStory = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var i, endpoint, links;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          i = 4;
        case 1:
          if (!(i >= 1)) {
            _context5.next = 18;
            break;
          }
          endpoint = 'https://truyenyy.vip/danh-sach/truyen-full/trang-' + i;
          links = null;
          _context5.prev = 4;
          _context5.next = 7;
          return getLinkInCategory(endpoint);
        case 7:
          links = _context5.sent;
          _context5.next = 14;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](4);
          console.log('=> error getLinkInCategory:' + endpoint, _context5.t0);
          return _context5.abrupt("continue", 15);
        case 14:
          links.map(function (item) {
            return getStoryDetail(item);
          });
        case 15:
          i--;
          _context5.next = 1;
          break;
        case 18:
          console.log('xong getFullStory !!!!!!!!!!!!!!: ');
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[4, 10]]);
  }));
  return function getFullStory() {
    return _ref5.apply(this, arguments);
  };
}();
var downimg = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _saveUrlFile.addLogo)();
        case 2:
          // await addTextImage()
          console.log('ok!');
        case 3:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function downimg() {
    return _ref6.apply(this, arguments);
  };
}();
var updateImageForstory = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var list, i, img, data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return Model['story'].findAll({
            attributes: ['id']
          });
        case 2:
          list = _context7.sent;
          i = 0;
        case 4:
          if (!(i < list.length)) {
            _context7.next = 15;
            break;
          }
          _context7.next = 7;
          return (0, _saveUrlFile.imageRandom)();
        case 7:
          img = _context7.sent;
          data = {
            imageSave: img
          };
          _context7.next = 11;
          return Model['story'].update(data, {
            where: {
              id: list[i].id
            }
          });
        case 11:
          console.log(list[i].id, img);
        case 12:
          i++;
          _context7.next = 4;
          break;
        case 15:
          console.log('xong updated updateImageForstory !!!!!!!');
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function updateImageForstory() {
    return _ref7.apply(this, arguments);
  };
}();
var updateMedia = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var list, i, data;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _saveUrlFile.listImagesOptimize)();
        case 2:
          list = _context8.sent;
          i = 0;
        case 4:
          if (!(i < list.length)) {
            _context8.next = 13;
            break;
          }
          data = {
            name: list[i],
            alt: 'truyenfullonline, cập nhật liên tục hàng ngày - ' + list[i],
            path: '/uploads/images/' + list[i],
            fullpath: '/public/uploads/images/' + list[i],
            type: 'jpg',
            category: 'image',
            inside: 'true',
            status: 'on',
            createdAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss')
          };
          console.log(data);
          _context8.next = 9;
          return Model['media'].create(data);
        case 9:
          console.log(list[i]);
        case 10:
          i++;
          _context8.next = 4;
          break;
        case 13:
          console.log('xong updated updateMedia !!!!!!!');
          _shelljs["default"].exec("docker exec -it databases_rediscache_1 redis-cli FLUSHALL && curl --silent https://truyenfullonline.com");
        case 15:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function updateMedia() {
    return _ref8.apply(this, arguments);
  };
}();
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
switch (myArgs[0]) {
  case 'getNewestStory':
    getStoryDetail('https://truyenyy.vip/truyen/dai-mong-chu/');
    // getNewestStory();
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}
var _default = exports["default"] = {
  getStoryDetail: getStoryDetail,
  getLinkInCategory: getLinkInCategory,
  getNewestStory: getNewestStory,
  getFullStory: getFullStory,
  downimg: downimg,
  updateImageForstory: updateImageForstory,
  updateMedia: updateMedia
};