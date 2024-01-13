"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _config = _interopRequireDefault(require("./config"));
var _saveUrlFile = require("./saveUrlFile");
var Model = _interopRequireWildcard(require("../database/models"));
var _common = require("../helpers/common");
var _sync = require("./sync.common");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var PREFIX_SOURCE = 'truyentr.org';
var getStoryDetail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
    var storyId,
      selector,
      result,
      storyName,
      images,
      author,
      genre,
      resource,
      crawlerFrom,
      state,
      shortDescription,
      rate,
      paginate,
      textfinalPaginate,
      linkPageChapter,
      listStoryPageFinal,
      countStoryPageFinal,
      totalPage,
      splitPage,
      slugStory,
      slugTmp,
      listPageChapter,
      totalChapter,
      imageSave,
      story,
      obj,
      storySave,
      order,
      arrLinks,
      startI,
      _yield$Model$chapter$,
      count,
      _loop,
      i,
      chapters,
      _i,
      chapterObj,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          storyId = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
          if (!url) {
            url = 'https://webtruyenfree.com/mao-son-troc-quy-nhan/';
            // return;
          }
          _context2.next = 4;
          return (0, _sync.removeRefStory)(storyId);
        case 4:
          selector = null;
          _context2.prev = 5;
          _context2.next = 8;
          return _config["default"].loadCheerio(url);
        case 8:
          selector = _context2.sent;
          _context2.next = 15;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](5);
          console.log('error', _context2.t0);
          return _context2.abrupt("return", false);
        case 15:
          result = selector('#wrap');
          storyName = (0, _common.clearUnicode)(result.find('.name.book h3').text());
          console.log(storyName);
          return _context2.abrupt("return");
        case 37:
          listStoryPageFinal = _context2.sent;
          _context2.next = 44;
          break;
        case 40:
          _context2.prev = 40;
          _context2.t1 = _context2["catch"](34);
          console.log('=> error listStoryPageFinal:' + linkPageChapter, _context2.t1);
          return _context2.abrupt("return", false);
        case 44:
          countStoryPageFinal = listStoryPageFinal('.list-chapters li a').length;
          totalPage = 1;
          if (linkPageChapter) {
            splitPage = linkPageChapter.split('?trang=');
            totalPage = parseInt(splitPage[1]);
          }
          slugStory = (0, _common.xoaDau)(url.split('/')[4], '-');
          slugTmp = slugStory;
          listPageChapter = [];
          totalChapter = (totalPage - 1) * 50 + countStoryPageFinal; // random image
          _context2.next = 53;
          return (0, _saveUrlFile.imageRandom)();
        case 53:
          imageSave = _context2.sent;
          _context2.next = 56;
          return Model['story'].findOne({
            attributes: ['id', 'slug', 'crawlerFrom', 'totalPage'],
            where: {
              slug: (0, _common.convertSlugStory)(slugStory)
            }
          });
        case 56:
          story = _context2.sent;
          if (!story) {
            _context2.next = 60;
            break;
          }
          _context2.next = 60;
          return Model['chapter'].update({
            updatedAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss'),
            crawlerFrom: PREFIX_SOURCE
          }, {
            where: {
              storyId: story.id
            }
          });
        case 60:
          obj = {
            name: storyName,
            slug: slugStory,
            link: url,
            source_crawler_1: url,
            images: images,
            imageSave: imageSave,
            author: author,
            genre: genre,
            resource: resource,
            state: state,
            rate: rate,
            shortDescription: shortDescription,
            paginate: paginate,
            listPageChapter: listPageChapter,
            status: 'on',
            totalPage: totalPage,
            haveChapterContent: 1,
            crawlerFrom: crawlerFrom,
            totalChapter: totalChapter,
            createdAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss')
          };
          console.log(obj);
          storySave = null;
          _context2.prev = 63;
          if (story) {
            _context2.next = 70;
            break;
          }
          _context2.next = 67;
          return Model['story'].create(obj);
        case 67:
          _context2.t2 = _context2.sent;
          _context2.next = 71;
          break;
        case 70:
          _context2.t2 = story;
        case 71:
          storySave = _context2.t2;
          _context2.next = 78;
          break;
        case 74:
          _context2.prev = 74;
          _context2.t3 = _context2["catch"](63);
          console.log('=> error save story:' + url, _context2.t3);
          return _context2.abrupt("return", false);
        case 78:
          _context2.next = 80;
          return (0, _sync.updateStoryToCategory)(storySave.id, obj.genre);
        case 80:
          _context2.next = 82;
          return (0, _sync.updateTotalChapter)(storySave.id);
        case 82:
          _context2.next = 84;
          return Model['story'].findOne({
            attributes: ['id', 'slug', 'crawlerFrom'],
            where: {
              id: storySave.id
            }
          });
        case 84:
          storySave = _context2.sent;
          // lặp để lấy link từng trang
          order = 0;
          arrLinks = [];
          startI = 0;
          _context2.next = 90;
          return Model['chapter'].findAndCountAll({
            attributes: ['id'],
            where: {
              storyId: storySave.id
            },
            limit: 1
          });
        case 90:
          _yield$Model$chapter$ = _context2.sent;
          count = _yield$Model$chapter$.count;
          startI = Math.floor(count / 50) || 1;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var endpoint, crawler, listLinks, links;
            return _regeneratorRuntime().wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  endpoint = 'https://truyentr.org/truyen/' + slugTmp + '/?trang=' + i;
                  console.log(endpoint);
                  crawler = null;
                  _context.prev = 3;
                  _context.next = 6;
                  return _config["default"].loadCheerio(endpoint);
                case 6:
                  crawler = _context.sent;
                  _context.next = 13;
                  break;
                case 9:
                  _context.prev = 9;
                  _context.t0 = _context["catch"](3);
                  console.log('=> error link in page: ' + endpoint, _context.t0);
                  return _context.abrupt("return", 1);
                case 13:
                  listLinks = crawler('.list-chapters').find('a');
                  links = listLinks.map(function (index, el) {
                    order++;
                    var linkChapter = crawler(el).attr('href');
                    return {
                      linkChapter: linkChapter,
                      order: order
                    };
                  }).get();
                  arrLinks = [].concat(_toConsumableArray(arrLinks), _toConsumableArray(links));
                case 16:
                case "end":
                  return _context.stop();
              }
            }, _loop, null, [[3, 9]]);
          });
          i = startI;
        case 95:
          if (!(i <= totalPage)) {
            _context2.next = 102;
            break;
          }
          return _context2.delegateYield(_loop(), "t4", 97);
        case 97:
          if (!_context2.t4) {
            _context2.next = 99;
            break;
          }
          return _context2.abrupt("continue", 99);
        case 99:
          i++;
          _context2.next = 95;
          break;
        case 102:
          chapters = [];
          _i = 0;
        case 104:
          if (!(_i < arrLinks.length)) {
            _context2.next = 113;
            break;
          }
          console.log('arrLinks[i].linkChapter', arrLinks[_i].linkChapter);
          _context2.next = 108;
          return getChapter(arrLinks[_i].linkChapter, storySave.id, (0, _common.convertSlugStory)(slugStory), arrLinks[_i].order);
        case 108:
          chapterObj = _context2.sent;
          if (chapterObj) {
            chapters.push(chapterObj);
          }
        case 110:
          _i++;
          _context2.next = 104;
          break;
        case 113:
          Model.chapter.bulkCreate(chapters, {
            ignoreDuplicates: true
          });
          setTimeout(function () {
            (0, _sync.updateTotalChapter)(storySave.id);
            (0, _sync.itemSyncChapterNewest)(storySave.id);
          }, 500);
          console.log("=============================", storySave.id);
          console.log('===== Xong getStoryDetail truyentr.com !!!!!!!!!!!!!!: ' + url);
          return _context2.abrupt("return", true);
        case 118:
        case "end":
          return _context2.stop();
      }
    }, _callee, null, [[5, 11], [34, 40], [63, 74]]);
  }));
  return function getStoryDetail(_x) {
    return _ref.apply(this, arguments);
  };
}();

// lấy link của thể loại truyện
var getLinkInCategory = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var link,
      selector,
      result,
      links,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          link = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
          _context3.next = 3;
          return _config["default"].loadCheerio(link);
        case 3:
          selector = _context3.sent;
          result = selector('.col-main-content .truyen-title').find('a');
          links = result.map(function (index, el) {
            return selector(el).attr('href');
          }).get();
          return _context3.abrupt("return", links.reverse());
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee2);
  }));
  return function getLinkInCategory() {
    return _ref2.apply(this, arguments);
  };
}();

// lấy dữ liệu của từng chương
var getChapter = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(link, storyId, slugStory) {
    var chapterOrder,
      selector,
      chapter,
      chapterName,
      firstDom,
      firstText,
      arr,
      arrDescription,
      objChapter,
      chapterDetail,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          chapterOrder = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : null;
          if (!(!link || !storyId || !slugStory)) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", null);
        case 3:
          selector = null;
          _context4.prev = 4;
          _context4.next = 7;
          return _config["default"].loadCheerio(link);
        case 7:
          selector = _context4.sent;
          _context4.next = 14;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](4);
          console.log('=> error crawler chapter: ' + link, _context4.t0);
          return _context4.abrupt("return", false);
        case 14:
          chapter = selector('.content.container1.chapter-c').find('br');
          chapterName = (0, _common.clearUnicode)(selector('.active.rv-author-a').text() + ': ' + selector('.rv-full-story-title h1.rv-full-story-title').text());
          firstDom = selector('.content.container1.chapter-c').find('br')[0];
          firstText = firstDom && firstDom.previousSibling && firstDom.previousSibling.nodeValue ? firstDom.previousSibling.nodeValue : '';
          arr = chapter.map(function (index, el) {
            if (el.nextSibling) {
              return el.nextSibling.nodeValue;
            }
          }).get();
          if (arr.length < 3) {
            chapter = selector('.content.container1.chapter-c').find('p');
            arr = chapter.map(function (index, el) {
              return selector(el).text();
            }).get();
          }
          arrDescription = [firstText].concat(_toConsumableArray(arr));
          objChapter = {
            storyId: storyId,
            name: chapterName,
            slug: (0, _common.xoaDau)(chapterName),
            slugUnique: (0, _common.xoaDau)(slugStory + '-atruyenhay-' + chapterName),
            nameUnique: slugStory + '-atruyenhay-' + chapterName,
            link: link,
            source_crawler_1: link,
            description: (0, _common.clearUnicode)(arrDescription.join('<br />')),
            description2: (0, _common.clearUnicode)(JSON.stringify(arrDescription)),
            chapterOrder: chapterOrder,
            status: 'on',
            createdAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss')
          };
          return _context4.abrupt("return", objChapter);
        case 25:
          chapterDetail = _context4.sent;
          if (!chapterDetail) {
            _context4.next = 30;
            break;
          }
          _context4.next = 29;
          return Model['chapter'].update({
            description: objChapter.description,
            description2: objChapter.description2,
            updatedAt: chapterDetail.updatedAt
          }, {
            where: {
              id: chapterDetail.id
            }
          });
        case 29:
          return _context4.abrupt("return", false);
        case 30:
          _context4.prev = 30;
          _context4.next = 33;
          return Model['chapter'].create(objChapter);
        case 33:
          _context4.next = 38;
          break;
        case 35:
          _context4.prev = 35;
          _context4.t1 = _context4["catch"](30);
          console.log('=> error save chapter:' + link, _context4.t1);
        case 38:
          return _context4.abrupt("return", true);
        case 39:
        case "end":
          return _context4.stop();
      }
    }, _callee3, null, [[4, 10], [30, 35]]);
  }));
  return function getChapter(_x2, _x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

// cập nhật truyện mới từ truyện full
var getNewestStory = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var i, endpoint, links;
    return _regeneratorRuntime().wrap(function _callee4$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          i = 1;
        case 1:
          if (!(i >= 1)) {
            _context5.next = 19;
            break;
          }
          endpoint = 'https://truyentr.org/danh-sach/truyen-moi/?page=' + i;
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
          return _context5.abrupt("continue", 16);
        case 14:
          console.log(links);
          links.map(function (item) {
            if (item.includes('truyentr.org')) {
              getStoryDetail(item);
            } else if (item.includes('truyentr.com')) {
              truyentr.getStoryDetail(item);
            } else {
              blogtamsu.getStoryDetail(item);
            }
          });
        case 16:
          i--;
          _context5.next = 1;
          break;
        case 19:
          console.log('xong getNewestStory !!!!!!!!!!!!!!: ');
        case 20:
        case "end":
          return _context5.stop();
      }
    }, _callee4, null, [[4, 10]]);
  }));
  return function getNewestStory() {
    return _ref4.apply(this, arguments);
  };
}();
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
switch (myArgs[0]) {
  case 'getNewestStory':
    getStoryDetail();
    // getNewestStory();
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}
var _default = exports["default"] = {
  getStoryDetail: getStoryDetail,
  getNewestStory: getNewestStory
};