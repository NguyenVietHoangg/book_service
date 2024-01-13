"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _axios = _interopRequireDefault(require("axios"));
var _cheerio = _interopRequireDefault(require("cheerio"));
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
var PREFIX_SOURCE = 'webtruyen.com';
// lấy thông tin chi tiết của một truyện
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
      linkTruyentt,
      rate,
      paginate,
      textfinalPaginate,
      linkPageChapter,
      listStoryPageFinal,
      countStoryPageFinal,
      finalChapterArr,
      totalPage,
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
      _yield$Model$chapter$,
      count,
      startI,
      _loop,
      i,
      chapters,
      step,
      _i,
      chapterObj,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          storyId = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
          if (url) {
            _context2.next = 4;
            break;
          }
          url = 'https://dtruyen.com/ma-ngan/';
          return _context2.abrupt("return");
        case 4:
          _context2.next = 6;
          return (0, _sync.removeRefStory)(storyId);
        case 6:
          selector = null;
          _context2.prev = 7;
          _context2.next = 10;
          return _axios["default"].get(url);
        case 10:
          selector = _context2.sent;
          selector = _cheerio["default"].load(selector.data);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](7);
          console.log('error', _context2.t0);
          return _context2.abrupt("return", false);
        case 18:
          result = selector('.main-col');
          storyName = (0, _common.clearUnicode)(result.find('.col2 .title').text());
          images = result.find('.col1 .thumb img').attr('src');
          author = (0, _common.clearUnicode)(selector(result.find('.col1 .author span')[0]).text().replace('Tác giả:', ''));
          genre = (0, _common.clearUnicode)(selector(result.find('.col1 .story_categories')[0]).text().replace('Thể loại:', ''));
          resource = (0, _common.clearUnicode)((selector(result.find('.info .meta li')[2]).text() + '-' + PREFIX_SOURCE).replace('Nguồn:', '').replace('Trạng thái:', ''));
          crawlerFrom = PREFIX_SOURCE;
          state = (0, _common.clearUnicode)(selector(result.find('.col1 .infos p')[4]).text().replace('Thể loại:', ''));
          shortDescription = (0, _common.clearUnicode)(result.find('.col2 .description').html()).replace('truyenhay.com', 'truyenfullonline.com');
          linkTruyentt = result.find('.desc-text a').attr('href');
          rate = (0, _common.clearUnicode)(result.find('.col2 .rate .small strong span').text());
          rate = rate ? 8.7 : parseFloat(rate, 1);
          paginate = result.find('.pagination-control .pagination a').length ? result.find('.pagination-control .pagination a').length : 1; // console.log('paginate', paginate); return
          textfinalPaginate = selector(result.find('.pagination-control .pagination a')[paginate - 2]).text();
          linkPageChapter = selector(result.find('.pagination-control .pagination a')[paginate - 2]).attr('href');
          listStoryPageFinal = null;
          _context2.prev = 34;
          _context2.next = 37;
          return _axios["default"].get(linkPageChapter);
        case 37:
          selector = _context2.sent;
          listStoryPageFinal = _cheerio["default"].load(selector.data);
          _context2.next = 45;
          break;
        case 41:
          _context2.prev = 41;
          _context2.t1 = _context2["catch"](34);
          console.log('=> error listStoryPageFinal:' + linkPageChapter, _context2.t1);
          return _context2.abrupt("return", false);
        case 45:
          countStoryPageFinal = parseInt(listStoryPageFinal('#chapters .chapters').find('a').length);
          finalChapterArr = linkPageChapter.split('/');
          totalPage = finalChapterArr[4];
          slugStory = finalChapterArr[3];
          slugTmp = finalChapterArr[3];
          listPageChapter = [];
          totalChapter = (totalPage - 1) * 30 + countStoryPageFinal; // random image
          _context2.next = 54;
          return (0, _saveUrlFile.imageRandom)();
        case 54:
          imageSave = _context2.sent;
          _context2.next = 57;
          return Model['story'].findOne({
            attributes: ['id', 'slug', 'crawlerFrom'],
            where: {
              slug: (0, _common.convertSlugStory)(slugStory)
            }
          });
        case 57:
          story = _context2.sent;
          if (!story) {
            _context2.next = 61;
            break;
          }
          _context2.next = 61;
          return Model['chapter'].update({
            updatedAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss'),
            crawlerFrom: PREFIX_SOURCE
          }, {
            where: {
              storyId: story.id
            }
          });
        case 61:
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
          _context2.next = 89;
          return Model['chapter'].findAndCountAll({
            attributes: ['id'],
            where: {
              storyId: storySave.id
            },
            limit: 1
          });
        case 89:
          _yield$Model$chapter$ = _context2.sent;
          count = _yield$Model$chapter$.count;
          startI = Math.floor(count / 30) || 1;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var chapternext, endpoint, crawler, listLinks, links;
            return _regeneratorRuntime().wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  chapternext = i == 1 ? '' : i;
                  endpoint = 'https://webtruyen.com/' + slugTmp + '/' + chapternext;
                  crawler = null;
                  _context.prev = 3;
                  _context.next = 6;
                  return _config["default"].loadCheerio(endpoint);
                case 6:
                  crawler = _context.sent;
                  _context.next = 9;
                  return _axios["default"].get(endpoint);
                case 9:
                  crawler = _context.sent;
                  crawler = _cheerio["default"].load(crawler.data);
                  _context.next = 17;
                  break;
                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](3);
                  console.log('=> error link in page: ' + endpoint, _context.t0);
                  return _context.abrupt("return", 1);
                case 17:
                  listLinks = crawler('#chapters .chapters').find('a');
                  links = listLinks.map(function (index, el) {
                    order++;
                    var linkChapter = crawler(el).attr('href');
                    return {
                      linkChapter: linkChapter,
                      order: order
                    };
                  }).get();
                  arrLinks = [].concat(_toConsumableArray(arrLinks), _toConsumableArray(links));
                case 20:
                case "end":
                  return _context.stop();
              }
            }, _loop, null, [[3, 13]]);
          });
          i = startI;
        case 94:
          if (!(i <= totalPage)) {
            _context2.next = 101;
            break;
          }
          return _context2.delegateYield(_loop(), "t4", 96);
        case 96:
          if (!_context2.t4) {
            _context2.next = 98;
            break;
          }
          return _context2.abrupt("continue", 98);
        case 98:
          i++;
          _context2.next = 94;
          break;
        case 101:
          chapters = [];
          step = 50;
          _i = 0;
        case 104:
          if (!(_i < arrLinks.length)) {
            _context2.next = 117;
            break;
          }
          console.log('arrLinks[' + _i + '].linkChapter', arrLinks[_i].linkChapter);
          _context2.next = 108;
          return getChapter(arrLinks[_i].linkChapter, storySave.id, (0, _common.convertSlugStory)(slugStory), arrLinks[_i].order);
        case 108:
          chapterObj = _context2.sent;
          if (chapterObj) {
            chapters.push(chapterObj);
          }
          if (!(chapters.length === step || _i === arrLinks.length - 1)) {
            _context2.next = 114;
            break;
          }
          _context2.next = 113;
          return Model.chapter.bulkCreate(chapters, {
            ignoreDuplicates: true
          });
        case 113:
          chapters = [];
        case 114:
          _i++;
          _context2.next = 104;
          break;
        case 117:
          setTimeout(function () {
            (0, _sync.updateTotalChapter)(storySave.id);
            (0, _sync.itemSyncChapterNewest)(storySave.id);
          }, 500);
          console.log("=============================", storySave.id);
          console.log('xong getStoryDetail !!!!!!!!!!!!!!: ' + url);
          return _context2.abrupt("return", true);
        case 121:
        case "end":
          return _context2.stop();
      }
    }, _callee, null, [[7, 14], [34, 41], [63, 74]]);
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
      chapter,
      chapterName,
      firstDom,
      firstText,
      arr,
      arrDescription,
      objChapter,
      chapterDetail,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          chapterOrder = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : null;
          if (!(!link || !storyId || !slugStory)) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", null);
        case 3:
          selector = null;
          _context3.prev = 4;
          _context3.next = 7;
          return _axios["default"].get(link);
        case 7:
          selector = _context3.sent;
          selector = _cheerio["default"].load(selector.data);
          _context3.next = 15;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](4);
          console.log('=> error crawler chapter: ' + link, _context3.t0);
          return _context3.abrupt("return", false);
        case 15:
          chapter = selector('.chap-detail').find('br');
          chapterName = (0, _common.clearUnicode)(selector('#chapter .chapter-title').text()).trim(':');
          firstDom = selector('.chap-detail').find('br')[0];
          firstText = firstDom && firstDom.previousSibling && firstDom.previousSibling.nodeValue ? firstDom.previousSibling.nodeValue : '';
          arr = chapter.map(function (index, el) {
            if (el.nextSibling) {
              return el.nextSibling.nodeValue;
            }
          }).get();
          if (arr.length < 3) {
            chapter = selector('#chapter-content').find('p');
            arr = chapter.map(function (index, el) {
              return selector(el).text();
            }).get();
          }
          arrDescription = [firstText].concat(_toConsumableArray(arr));
          objChapter = {
            storyId: storyId,
            name: chapterName,
            slug: (0, _common.xoaDau)(chapterName),
            slugUnique: slugStory + '-atruyenhay-' + (0, _common.xoaDau)(chapterName),
            nameUnique: slugStory + '-atruyenhay-' + (0, _common.xoaDau)(chapterName),
            link: link,
            source_crawler_1: link,
            description: (0, _common.clearUnicode)(arrDescription.join('<br />')),
            description2: (0, _common.clearUnicode)(JSON.stringify(arrDescription)),
            chapterOrder: chapterOrder,
            status: 'on',
            createdAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss')
          };
          return _context3.abrupt("return", objChapter);
        case 26:
          chapterDetail = _context3.sent;
          if (!chapterDetail) {
            _context3.next = 31;
            break;
          }
          _context3.next = 30;
          return Model['chapter'].update({
            description: objChapter.description,
            description2: objChapter.description2,
            updatedAt: chapterDetail.updatedAt
          }, {
            where: {
              id: chapterDetail.id
            }
          });
        case 30:
          return _context3.abrupt("return", false);
        case 31:
          _context3.prev = 31;
          _context3.next = 34;
          return Model['chapter'].create(objChapter);
        case 34:
          _context3.next = 39;
          break;
        case 36:
          _context3.prev = 36;
          _context3.t1 = _context3["catch"](31);
          console.log('=> error save chapter:' + link, _context3.t1);
        case 39:
          return _context3.abrupt("return", true);
        case 40:
        case "end":
          return _context3.stop();
      }
    }, _callee2, null, [[4, 11], [31, 36]]);
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
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          link = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
          _context4.next = 3;
          return _config["default"].loadCheerio(link);
        case 3:
          selector = _context4.sent;
          result = selector('.col-truyen-main .col-xs-7 h3.truyen-title').find('a');
          links = result.map(function (index, el) {
            return selector(el).attr('href');
          }).get();
          return _context4.abrupt("return", links.reverse());
        case 7:
        case "end":
          return _context4.stop();
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
    var i, endpoint, links, j;
    return _regeneratorRuntime().wrap(function _callee4$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          i = 4;
        case 1:
          if (!(i >= 1)) {
            _context5.next = 24;
            break;
          }
          endpoint = 'https://truyenhay.com/danh-sach/truyen-moi/trang-' + i;
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
          return _context5.abrupt("continue", 21);
        case 14:
          j = 0;
        case 15:
          if (!(j < links.length)) {
            _context5.next = 21;
            break;
          }
          _context5.next = 18;
          return getStoryDetail(links[j]);
        case 18:
          j++;
          _context5.next = 15;
          break;
        case 21:
          i--;
          _context5.next = 1;
          break;
        case 24:
          console.log('xong getNewestStory !!!!!!!!!!!!!!: ');
        case 25:
        case "end":
          return _context5.stop();
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
    var i, endpoint, links, j;
    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          i = 4;
        case 1:
          if (!(i >= 1)) {
            _context6.next = 24;
            break;
          }
          endpoint = 'https://truyenhay.com/danh-sach/truyen-full/trang-' + i;
          links = null;
          _context6.prev = 4;
          _context6.next = 7;
          return getLinkInCategory(endpoint);
        case 7:
          links = _context6.sent;
          _context6.next = 14;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](4);
          console.log('=> error getLinkInCategory:' + endpoint, _context6.t0);
          return _context6.abrupt("continue", 21);
        case 14:
          j = 0;
        case 15:
          if (!(j < links.length)) {
            _context6.next = 21;
            break;
          }
          _context6.next = 18;
          return getStoryDetail(links[j]);
        case 18:
          j++;
          _context6.next = 15;
          break;
        case 21:
          i--;
          _context6.next = 1;
          break;
        case 24:
          console.log('xong getFullStory !!!!!!!!!!!!!!: ');
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee5, null, [[4, 10]]);
  }));
  return function getFullStory() {
    return _ref5.apply(this, arguments);
  };
}();
var downimg = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _saveUrlFile.addLogo)();
        case 2:
          // await addTextImage()
          console.log('ok!');
        case 3:
        case "end":
          return _context7.stop();
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
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return Model['story'].findAll({
            attributes: ['id']
          });
        case 2:
          list = _context8.sent;
          i = 0;
        case 4:
          if (!(i < list.length)) {
            _context8.next = 15;
            break;
          }
          _context8.next = 7;
          return (0, _saveUrlFile.imageRandom)();
        case 7:
          img = _context8.sent;
          data = {
            imageSave: img
          };
          _context8.next = 11;
          return Model['story'].update(data, {
            where: {
              id: list[i].id
            }
          });
        case 11:
          console.log(list[i].id, img);
        case 12:
          i++;
          _context8.next = 4;
          break;
        case 15:
          console.log('xong updated updateImageForstory !!!!!!!');
        case 16:
        case "end":
          return _context8.stop();
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
    return _regeneratorRuntime().wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _saveUrlFile.listImagesOptimize)();
        case 2:
          list = _context9.sent;
          i = 0;
        case 4:
          if (!(i < list.length)) {
            _context9.next = 13;
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
          _context9.next = 9;
          return Model['media'].create(data);
        case 9:
          console.log(list[i]);
        case 10:
          i++;
          _context9.next = 4;
          break;
        case 13:
          console.log('xong updated updateMedia !!!!!!!');
        case 14:
        case "end":
          return _context9.stop();
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
    // getNewestStory();
    getStoryDetail();
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