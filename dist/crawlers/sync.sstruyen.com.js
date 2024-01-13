"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateImageForstory = exports.updateChapterToStory = exports.updateChapter = exports.quetTruyenZero = exports.quetChuongTruyenConTrong = exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _sequelize = require("sequelize");
var _config = _interopRequireDefault(require("./config"));
var _saveUrlFile = _interopRequireWildcard(require("./saveUrlFile"));
var Model = _interopRequireWildcard(require("../database/models"));
var _common = require("../helpers/common");
var _sync = require("./sync.common");
var _syncAllToStory = require("../webServices/syncAllToStory");
var _settingCrawler = require("./settingCrawler");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// import { crawlerToQueueStory, crawlerToQueueChapter } from '../queue'

//truyện full sẽ redirect qua các trang truyện là truyentr.com, vi.blogtamsu.com

var PREFIX_SOURCE = 'sstruyen.com';
var configDomainFrom = process.env.CRAWLER_FROM || 'sstruyen.com';
var hconfigDomainFrom = 'https://' + configDomainFrom;
// lấy thông tin chi tiết của một truyện
var getStoryDetail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var url,
      storyId,
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
      linktruyentr,
      rate,
      totalPage,
      results,
      match,
      finalChapterArr,
      slugStory,
      slugTmp,
      totalChapter,
      imageSave,
      story,
      arrslugStory,
      pop,
      slugStoryUnique,
      time,
      obj,
      storySave,
      arrLinks,
      isQueryPage,
      startI,
      count,
      order,
      i,
      endpoint,
      checkNewestBlock,
      _result,
      listLinks,
      links,
      where,
      data,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          url = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
          storyId = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
          if (url) {
            _context.next = 5;
            break;
          }
          // url = hconfigDomainFrom+'/sau-khi-dai-lao-ve-huu/'
          url = hconfigDomainFrom + '/truyen-thuyet-muoi-ba-con-giap/';
          return _context.abrupt("return");
        case 5:
          url = (0, _settingCrawler.getUrl)(url);
          console.log('urlxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', url);
          // const finalChapterArrTmp = url.split('/')
          // const slugX= finalChapterArrTmp[3];
          // let storyTmp = await Model['story'].findOne({
          //   attributes: ['id','slug', 'crawlerFrom'],
          //   where: {
          //     slug: convertSlugStory(slugX)
          //   }
          // });
          // if (storyTmp) {
          //   console.log('================= storyTmp '+slugX+' đã tồn tại nên bỏ qua ===========')
          //   return
          // }
          // await removeRefStory(storyId)
          _context.next = 9;
          return _config["default"].loadCheerio(url);
        case 9:
          selector = _context.sent;
          if (selector) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", false);
        case 12:
          result = selector('.story-details .row.wrap-detail.pc');
          storyName = (0, _common.clearUnicode)(result.find('.col-md-8 h1.title').text());
          console.log('storyNamestoryNamestoryNamestoryNamestoryName', storyName);
          images = '';
          author = (0, _common.clearUnicode)(selector(selector(result).find('.col-md-8 .content1 .info p')[0]).text().replace('Tác giả:', ''));
          genre = (0, _common.clearUnicode)(selector(selector(result).find('.col-md-8 .content1 .info p')[1]).text().replace('Thể loại:', ''));
          resource = (0, _common.clearUnicode)(selector(selector(result).find('.col-md-8 .content1 .info p')[2]).text());
          crawlerFrom = PREFIX_SOURCE;
          state = selector(selector(result).find('.col-md-8 .content1 .info p')[3]).text().replace('Trạng thái:', '').trim();
          shortDescription = selector(selector(result).find('.col-md-8 .content1>p')).text().replace(/ +/g, ' ').replace(/sstruyen/g, 'atruyenhay');
          linktruyentr = result.find('.desc-text a').attr('href');
          if (linktruyentr && linktruyentr.includes('?')) {
            linktruyentr = linktruyentr.split('?')[0];
          }
          rate = selector(selector(result).find('.col-md-8 .meta .rate')).text();
          rate = 8.9;

          // start - lấy tổng số trang
          totalPage = 1;
          results = selector('.pagination.pc .nexts').find('a').attr('href');
          match = /trang-(.*)\/#s_c_content/gm.exec(results);
          if (match && match[1] && parseInt(match[1]) > 0) {
            totalPage = parseInt(match[1]);
          }
          finalChapterArr = url.split('/');
          slugStory = finalChapterArr[3];
          slugTmp = finalChapterArr[3];
          totalChapter = totalPage * 32; // random image
          _context.next = 36;
          return (0, _saveUrlFile.imageRandom)();
        case 36:
          imageSave = _context.sent;
          _context.next = 39;
          return Model['story'].findOne({
            attributes: ['id', 'slug', 'crawlerFrom'],
            where: {
              slug: (0, _common.convertSlugStory)(slugStory)
            }
          });
        case 39:
          story = _context.sent;
          if (!story) {
            _context.next = 46;
            break;
          }
          console.log('================= Đã tồn tại nên bỏ qua ===========');
          _context.next = 44;
          return Model['chapter'].update({
            updatedAt: (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss')
          }, {
            where: {
              storyId: story.id
            }
          });
        case 44:
          _context.next = 54;
          break;
        case 46:
          arrslugStory = slugStory.split('-');
          pop = arrslugStory.pop();
          if (!parseInt(pop)) {
            _context.next = 54;
            break;
          }
          slugStory = arrslugStory.join('-');
          _context.next = 52;
          return Model['story'].findOne({
            attributes: ['id', 'slug', 'crawlerFrom'],
            where: {
              slug: (0, _common.convertSlugStory)(slugStory)
            }
          });
        case 52:
          story = _context.sent;
          slugStory = slugTmp;
        case 54:
          slugStoryUnique = (0, _common.convertSlugStory)(slugStory);
          time = (0, _moment["default"])().format('YYYY/MM/DD HH:mm:ss');
          obj = {
            name: storyName,
            slug: slugStoryUnique,
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
            status: 'on',
            totalPage: totalPage,
            haveChapterContent: 0,
            crawlerFrom: crawlerFrom,
            totalChapter: totalChapter,
            createdAt: time,
            updatedAt: time,
            publishedAt: time
          };
          storySave = null;
          _context.prev = 58;
          if (story) {
            _context.next = 65;
            break;
          }
          _context.next = 62;
          return Model['story'].create(obj);
        case 62:
          _context.t0 = _context.sent;
          _context.next = 66;
          break;
        case 65:
          _context.t0 = story;
        case 66:
          storySave = _context.t0;
          _context.next = 73;
          break;
        case 69:
          _context.prev = 69;
          _context.t1 = _context["catch"](58);
          console.log('=> error save story:' + url, _context.t1);
          return _context.abrupt("return", false);
        case 73:
          _context.next = 75;
          return (0, _sync.updateStoryToCategory)(storySave.id, obj.genre);
        case 75:
          // lặp để lấy link từng trang
          arrLinks = [];
          isQueryPage = false;
          if (!isQueryPage) {
            _context.next = 104;
            break;
          }
          startI = 0;
          _context.next = 81;
          return Model['chapter'].count({
            attributes: ['id'],
            where: {
              storyId: storySave.id
            }
          });
        case 81:
          count = _context.sent;
          order = count;
          startI = Math.floor(count / 32) || 1;
          i = startI;
        case 85:
          if (!(i <= totalPage)) {
            _context.next = 102;
            break;
          }
          endpoint = hconfigDomainFrom + '/' + slugTmp + '/trang-' + i;
          _context.next = 89;
          return _config["default"].loadCheerio(endpoint);
        case 89:
          selector = _context.sent;
          if (selector) {
            _context.next = 92;
            break;
          }
          return _context.abrupt("break", 102);
        case 92:
          checkNewestBlock = selector('.row.list-chap .col-xs-12').length;
          _result = selector('.row.list-chap');
          listLinks = null; // nếu có chương mới
          if (checkNewestBlock >= 2) {
            _result.find('.col-xs-12').slice(1).prevAll().remove(); // xóa phần trước đó
          }
          listLinks = _result.find('.col-sm-6 li a');
          links = listLinks.map(function (index, el) {
            order++;
            var linkChapter = selector(el).attr('href');
            var nameChapter = selector(el).text();
            var slugChapter = linkChapter.split('/')[2] ? linkChapter.split('/')[2] : '';
            var objChapter = {
              storyId: storySave.id,
              name: nameChapter,
              slug: slugChapter,
              slugUnique: slugStoryUnique + '-atruyenhay-' + slugChapter,
              nameUnique: slugStoryUnique + '-atruyenhay-' + slugChapter,
              link: linkChapter,
              source_crawler_1: hconfigDomainFrom + '' + linkChapter,
              description: '',
              description2: '',
              chapterOrder: order,
              status: 'on',
              createdAt: (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss')
            };
            return objChapter;
          }).get();
          arrLinks = [].concat(_toConsumableArray(arrLinks), _toConsumableArray(links));
        case 99:
          i++;
          _context.next = 85;
          break;
        case 102:
          _context.next = 107;
          break;
        case 104:
          _context.next = 106;
          return getListChapter(slugTmp, storySave.id);
        case 106:
          arrLinks = _context.sent;
        case 107:
          if (!arrLinks.length) {
            _context.next = 110;
            break;
          }
          _context.next = 110;
          return Model.chapter.bulkCreate(arrLinks, {
            ignoreDuplicates: true
          });
        case 110:
          // tiến hành lấy lại dữ liệu và cập nhật
          where = {
            storyId: storySave.id,
            description: ''
          };
          _context.next = 113;
          return Model.chapter.findAll({
            attributes: ['id', 'link'],
            where: where,
            raw: true
          });
        case 113:
          data = _context.sent;
          if (data.length > 0) {
            // for(let i=0; i<data.length; i++) {
            //   let linkInput = hconfigDomainFrom+''+data[i].link
            //   const chapterObj = await getChapter(linkInput);
            //   if (!chapterObj) {
            //     console.log('========= Cập nhật lỗi chương từ chapterId:'+data[i].id+' == truyen:'+slugStoryUnique+'|'+storySave.id+' === link:'+data[i].link);
            //     break;
            //   }
            //   await Model.chapter.update(chapterObj, {where: { id: data[i].id}});
            //   console.log('========= Hoàn thành cập nhật chapterId:'+data[i].id+' == truyen:'+slugStoryUnique+'|'+storySave.id+' === link:'+data[i].link);
            // }
          }
          // setTimeout(async function() {
          //   await sleep(randomSetTimeout(2))
          //   syncContenRefItem(storySave.id);
          // }, randomSetTimeout(1));
          // await syncContenRefItem(storySave.id);
          // await quetChuongTruyenConTrong(storySave.id)
          //quetChuongTruyenConTrong(storySave.id)
          console.log('xong getStoryDetail !!!!!!!!!!!!!!: storySave.id và ' + url);
          return _context.abrupt("return", true);
        case 117:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[58, 69]]);
  }));
  return function getStoryDetail() {
    return _ref.apply(this, arguments);
  };
}();

// lấy dữ liệu của từng chương
var getChapter = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(link) {
    var selector, chapter, firstDom, firstText, arr, arrDescription, objChapter;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (link) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", null);
        case 2:
          link = (0, _settingCrawler.getUrl)(link);
          _context2.next = 5;
          return _config["default"].loadCheerio(link);
        case 5:
          selector = _context2.sent;
          if (selector) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", null);
        case 8:
          chapter = selector('.content_wrap1 .container1 p').find('br');
          firstDom = selector('.content_wrap1 .container1').find('br')[0];
          firstText = firstDom && firstDom.previousSibling && firstDom.previousSibling.nodeValue ? firstDom.previousSibling.nodeValue : '';
          arr = chapter.map(function (index, el) {
            if (el.nextSibling) {
              return el.nextSibling.nodeValue;
            }
          }).get();
          arrDescription = [firstText].concat(_toConsumableArray(arr));
          if (arrDescription.length === 1 && arrDescription[0] == '') {
            arrDescription = [selector('.content_wrap1 .container1 p').html()];
          }
          objChapter = {
            description: (0, _common.clearUnicode)(arrDescription.join('<br />')),
            description2: (0, _common.clearUnicode)(JSON.stringify(arrDescription)),
            status: 'on'
          };
          return _context2.abrupt("return", objChapter);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getChapter(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// lấy toàn bộ link của category
var getCategories = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
    var linksDefault, i;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          linksDefault = [hconfigDomainFrom + '/the-loai/tien-hiep/', hconfigDomainFrom + '/the-loai/kiem-hiep/', hconfigDomainFrom + '/the-loai/ngon-tinh/', hconfigDomainFrom + '/the-loai/khoa-huyen/', hconfigDomainFrom + '/the-loai/huyen-huyen/', hconfigDomainFrom + '/the-loai/di-gioi/', hconfigDomainFrom + '/the-loai/xuyen-khong/', hconfigDomainFrom + '/the-loai/trong-sinh/', hconfigDomainFrom + '/the-loai/trinh-tham/', hconfigDomainFrom + '/the-loai/linh-di/', hconfigDomainFrom + '/the-loai/truyen-sac/', hconfigDomainFrom + '/the-loai/truyen-nguoc/', hconfigDomainFrom + '/the-loai/truyen-sung/', hconfigDomainFrom + '/the-loai/cung-dau/', hconfigDomainFrom + '/the-loai/truyen-nu-cuong/', hconfigDomainFrom + '/the-loai/truyen-gia-dau/', hconfigDomainFrom + '/the-loai/dam-my/'];
          if (linksDefault[id]) {
            linksDefault = [linksDefault[id]];
          }
          i = 0;
        case 3:
          if (!(i < linksDefault.length)) {
            _context3.next = 10;
            break;
          }
          _context3.next = 6;
          return getLinkInCategory(linksDefault[i]);
        case 6:
          console.log('======== xong the loai ========: ' + linksDefault[i]);
          // await sleep(100000);
        case 7:
          i++;
          _context3.next = 3;
          break;
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getCategories(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// lấy toàn bộ link category
var getCategoriesFull = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var url, selector, results, links, i;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          url = hconfigDomainFrom + '/';
          _context4.next = 3;
          return _config["default"].loadCheerio(url);
        case 3:
          selector = _context4.sent;
          if (selector) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", false);
        case 6:
          results = selector('.book-category ul').find('a');
          links = results.map(function (index, el) {
            var link = selector(el).attr('href');
            return {
              index: index,
              link: link,
              title: selector(el).attr('title'),
              slug: link.split('/')[1]
            };
          }).get();
          i = 0;
        case 9:
          if (!(i < links.length)) {
            _context4.next = 16;
            break;
          }
          _context4.next = 12;
          return getLinkInCategory(links[i]);
        case 12:
          console.log('======== xong the loai getCategoriesFull ========: ' + links[i]);
        case 13:
          i++;
          _context4.next = 9;
          break;
        case 16:
          return _context4.abrupt("return", links);
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getCategoriesFull() {
    return _ref4.apply(this, arguments);
  };
}();

// lấy link của thể loại truyện
var getLinkInCategory = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var url,
      selector,
      totalPage,
      results,
      match,
      links,
      i,
      urlItem,
      get,
      linkItems,
      _i,
      _args5 = arguments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          url = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
          if (url) {
            _context5.next = 4;
            break;
          }
          url = hconfigDomainFrom + '/the-loai/tien-hiep/';
          return _context5.abrupt("return");
        case 4:
          _context5.next = 6;
          return _config["default"].loadCheerio(url);
        case 6:
          selector = _context5.sent;
          if (selector) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", false);
        case 9:
          // start - lấy tổng số trang
          totalPage = 1;
          results = selector('.pagination.pc .nexts').find('a').attr('href');
          match = /trang-(.*)/gm.exec(results);
          if (match[1] && parseInt(match[1]) > 0) {
            totalPage = parseInt(match[1]);
          }
          // xử lý từng truyện
          links = [];
          i = totalPage;
        case 15:
          if (!(i > 0)) {
            _context5.next = 39;
            break;
          }
          _context5.next = 18;
          return (0, _common.sleep)((0, _common.randomSetTimeout)(1));
        case 18:
          urlItem = url + 'trang-' + i;
          console.log(urlItem);
          _context5.next = 22;
          return _config["default"].loadCheerio(urlItem);
        case 22:
          selector = _context5.sent;
          if (selector) {
            _context5.next = 25;
            break;
          }
          return _context5.abrupt("continue", 36);
        case 25:
          get = selector('.book-list .table-list.pc table').find('.info .rv-home-a-title a');
          linkItems = get.map(function (index, el) {
            var link = hconfigDomainFrom + '' + selector(el).attr('href');
            return link;
          }).get();
          links = [].concat(_toConsumableArray(links), _toConsumableArray(linkItems));
          if (!(links.length > 0)) {
            _context5.next = 36;
            break;
          }
          _i = 0;
        case 30:
          if (!(_i < links.length)) {
            _context5.next = 36;
            break;
          }
          _context5.next = 33;
          return getStoryDetail(links[_i]);
        case 33:
          _i++;
          _context5.next = 30;
          break;
        case 36:
          i--;
          _context5.next = 15;
          break;
        case 39:
          console.log(links);
        case 40:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getLinkInCategory() {
    return _ref5.apply(this, arguments);
  };
}();

// cập nhật truyện mới nhất
var getNewestStory = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var id,
      linksDefault,
      i,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : null;
          linksDefault = [hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=A1', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=A2', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=A3', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=C1', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=C2', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=C3', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=C7', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=C8', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=D1', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=D2', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=D4', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=D5', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=D6', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=D7', hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=D9'];
          if (linksDefault[id]) {
            linksDefault = [linksDefault[id]];
          }
          i = 0;
        case 4:
          if (!(i < linksDefault.length)) {
            _context6.next = 12;
            break;
          }
          console.log('======== start Newest story ========: ' + linksDefault[i]);
          _context6.next = 8;
          return getLinkNewest(linksDefault[i]);
        case 8:
          console.log('======== xong Newest story ========: ' + linksDefault[i]);
          // await sleep(100000);
        case 9:
          i++;
          _context6.next = 4;
          break;
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getNewestStory() {
    return _ref6.apply(this, arguments);
  };
}();

// lấy link của thể loại truyện
var getLinkNewest = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var url,
      selector,
      results,
      links,
      i,
      _args7 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          url = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : null;
          if (!url) {
            url = hconfigDomainFrom + '/ajax.php?newest=1&page=1&cate=A1';
            // return;
          }
          _context7.next = 4;
          return _config["default"].loadCheerio(url);
        case 4:
          selector = _context7.sent;
          if (selector) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", false);
        case 7:
          // start - lấy tổng số trang
          // let totalPage = 1;
          results = selector('table').find('.name a');
          links = results.map(function (index, el) {
            var link = hconfigDomainFrom + '/' + selector(el).attr('href');
            return link;
          }).get();
          if (!(links.length > 0)) {
            _context7.next = 17;
            break;
          }
          i = 0;
        case 11:
          if (!(i < links.length)) {
            _context7.next = 17;
            break;
          }
          _context7.next = 14;
          return getStoryDetail(links[i]);
        case 14:
          i++;
          _context7.next = 11;
          break;
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getLinkNewest() {
    return _ref7.apply(this, arguments);
  };
}();
var updateNewStory = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var limit,
      rows,
      i,
      _args8 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          limit = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : 500;
          _context8.next = 3;
          return Model.story.findAll({
            attributes: ['id', 'source_crawler_1'],
            limit: limit,
            order: [['id', 'desc']]
          });
        case 3:
          rows = _context8.sent;
          i = 0;
        case 5:
          if (!(i < rows.length)) {
            _context8.next = 12;
            break;
          }
          console.log('Id ==== ' + rows[i].id + '====link=== ' + rows[i].source_crawler_1);
          // await crawlerToQueueStory({from: 'wattpad.vn', link: rows[i].source_crawler_1.replace('sstruyen.com', 'wattpad.vn'), id: null})
          _context8.next = 9;
          return getStoryDetail(rows[i].source_crawler_1.replace('sstruyen.com', 'wattpad.vn'));
        case 9:
          i++;
          _context8.next = 5;
          break;
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function updateNewStory() {
    return _ref8.apply(this, arguments);
  };
}();
var updateImageForstory = exports.updateImageForstory = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var list, i, img, data;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return Model['story'].findAll({
            attributes: ['id']
          });
        case 2:
          list = _context9.sent;
          i = 0;
        case 4:
          if (!(i < list.length)) {
            _context9.next = 14;
            break;
          }
          _context9.next = 7;
          return (0, _saveUrlFile.imageRandom)();
        case 7:
          img = _context9.sent;
          data = {
            imageSave: img
          };
          _context9.next = 11;
          return Model['story'].update(data, {
            where: {
              id: list[i].id
            }
          });
        case 11:
          i++;
          _context9.next = 4;
          break;
        case 14:
          console.log('xong updated updateImageForstory !!!!!!!');
        case 15:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function updateImageForstory() {
    return _ref9.apply(this, arguments);
  };
}();
var updateChapterToStory = exports.updateChapterToStory = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _sync.syncChapterNewest)();
        case 2:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function updateChapterToStory() {
    return _ref10.apply(this, arguments);
  };
}();
var quetChuongTruyenConTrong = exports.quetChuongTruyenConTrong = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var storyId,
      page,
      where,
      limit,
      list,
      i,
      _args11 = arguments;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          storyId = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : null;
          page = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 1;
          console.log("============= Bắt đầu quét lấy nội dung chương của page sstruyen " + page);
          where = _defineProperty({}, _sequelize.Op.or, [{
            description: ''
          }, {
            description: _defineProperty({}, _sequelize.Op.is, null)
          }]);
          if (storyId) {
            where = {
              storyId: storyId,
              description: ''
            };
          }
          limit = 500;
          _context11.next = 8;
          return Model['chapter'].findAll({
            attributes: ['id', 'source_crawler_1'],
            where: where,
            limit: limit,
            offset: (page - 1) * limit
          });
        case 8:
          list = _context11.sent;
          if (!list.length) {
            _context11.next = 17;
            break;
          }
          i = 0;
        case 11:
          if (!(i < list.length)) {
            _context11.next = 17;
            break;
          }
          _context11.next = 14;
          return updateChapter(list[i].source_crawler_1, list[i].id);
        case 14:
          i++;
          _context11.next = 11;
          break;
        case 17:
          console.log("============= Hoàn thành quét xong quét lấy nội dung chương của sstruyen page " + page);
        case 18:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function quetChuongTruyenConTrong() {
    return _ref11.apply(this, arguments);
  };
}();
var updateChapter = exports.updateChapter = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(link, id) {
    var chapterObj;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return getChapter(link);
        case 2:
          chapterObj = _context12.sent;
          if (!(!chapterObj || !chapterObj.description)) {
            _context12.next = 6;
            break;
          }
          console.log('==== không lấy được nội dung chương của ' + id + ': ' + link);
          return _context12.abrupt("return", false);
        case 6:
          _context12.next = 8;
          return Model.chapter.update({
            description: chapterObj.description,
            description2: chapterObj.description2
          }, {
            where: {
              id: id
            }
          });
        case 8:
          console.log('==== Cập nhật xong nội dung chương của ' + id + ': ' + link);
        case 9:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function updateChapter(_x3, _x4) {
    return _ref12.apply(this, arguments);
  };
}();
var quetTruyenZero = exports.quetTruyenZero = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
    var list, i;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          console.log('==== quetTruyenZero của truyện chưa có chương');
          _context13.next = 3;
          return Model.story.findAll({
            attributes: ['id', 'source_crawler_1'],
            where: {
              totalChapter: 0
            }
          });
        case 3:
          list = _context13.sent;
          if (!list.length) {
            _context13.next = 12;
            break;
          }
          i = 0;
        case 6:
          if (!(i < list.length)) {
            _context13.next = 12;
            break;
          }
          _context13.next = 9;
          return getStoryDetail(list[i].source_crawler_1, list[i].id);
        case 9:
          i++;
          _context13.next = 6;
          break;
        case 12:
          console.log('==== quetTruyenZero xong của truyện chưa có chương');
        case 13:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function quetTruyenZero() {
    return _ref13.apply(this, arguments);
  };
}();
var getListChapter = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
    var slugStoryUnique,
      storyId,
      endpoint,
      selector,
      result,
      links,
      _args14 = arguments;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          slugStoryUnique = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : 'truyen-thuyet-muoi-ba-con-giap';
          storyId = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 10;
          endpoint = hconfigDomainFrom + '/ajax.php?get_chapt&story_seo=' + slugStoryUnique;
          console.log('enpoint chapter', endpoint);
          _context14.next = 6;
          return _config["default"].loadCheerio(endpoint);
        case 6:
          selector = _context14.sent;
          result = selector('select').find('option');
          links = result.map(function (index, el) {
            var linkChapter = selector(el).val();
            var nameChapter = selector(el).text();
            var slugChapter = linkChapter;
            var arrSlug = slugChapter.split('/');
            var objChapter = {
              storyId: storyId,
              name: nameChapter,
              slug: arrSlug[2],
              slugUnique: slugStoryUnique + '-atruyenhay-' + arrSlug[2],
              nameUnique: slugStoryUnique + '-atruyenhay-' + arrSlug[2],
              link: linkChapter,
              source_crawler_1: hconfigDomainFrom + '' + linkChapter,
              description: '',
              description2: '',
              chapterOrder: index + 1,
              status: 'on',
              createdAt: (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss')
            };
            return objChapter;
          }).get();
          console.log('linksxxxxxxxxxxxxxxxxxx', links);
          return _context14.abrupt("return", links);
        case 11:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function getListChapter() {
    return _ref14.apply(this, arguments);
  };
}();
var syncAuthor = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
    var list, refInsert, i, authorSlug, checkAuthor, authorId, author;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return Model.story.findAll({
            attributes: ['id', 'author'],
            raw: true
          });
        case 2:
          list = _context15.sent;
          refInsert = [];
          i = 0;
        case 5:
          if (!(i < list.length)) {
            _context15.next = 33;
            break;
          }
          console.log('object1', list[i]);
          if (list[i].author) {
            _context15.next = 9;
            break;
          }
          return _context15.abrupt("continue", 30);
        case 9:
          authorSlug = (0, _common.xoaDau)(list[i].author);
          if (authorSlug) {
            _context15.next = 12;
            break;
          }
          return _context15.abrupt("continue", 30);
        case 12:
          _context15.next = 14;
          return Model.author.findOne({
            attributes: ['id'],
            where: {
              slug: authorSlug,
              name: list[i].author
            }
          });
        case 14:
          checkAuthor = _context15.sent;
          authorId = null;
          if (checkAuthor) {
            _context15.next = 27;
            break;
          }
          _context15.next = 19;
          return Model.author.findOne({
            attributes: ['id'],
            where: {
              slug: authorSlug
            }
          });
        case 19:
          checkAuthor = _context15.sent;
          if (checkAuthor) {
            authorSlug = authorSlug + '-' + makeid(5);
          }
          _context15.next = 23;
          return Model.author.create({
            name: list[i].author,
            slug: authorSlug
          });
        case 23:
          author = _context15.sent;
          authorId = author.id;
          _context15.next = 28;
          break;
        case 27:
          authorId = checkAuthor.id;
        case 28:
          console.log('object2', refInsert);
          refInsert.push({
            authorId: authorId,
            storyId: list[i].id
          });
        case 30:
          i++;
          _context15.next = 5;
          break;
        case 33:
          if (!refInsert.length) {
            _context15.next = 37;
            break;
          }
          console.log('object3', refInsert);
          _context15.next = 37;
          return Model.author_story.bulkCreate(refInsert, {
            ignoreDuplicates: true
          });
        case 37:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function syncAuthor() {
    return _ref15.apply(this, arguments);
  };
}();
var makeid = function makeid(length) {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
var syncAllContentRef1000 = function syncAllContentRef1000() {
  (0, _syncAllToStory.syncAllContentRef)(1000);
};
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
switch (myArgs[0]) {
  case '2':
    getStoryDetail();
    break;
  case '3':
    getCategories(myArgs[1]);
    break;
  case '4':
    getLinkInCategory();
    break;
  case '5':
    getNewestStory();
    break;
  case '6':
    updateNewStory();
    break;
  case '7':
    getLinkNewest();
    break;
  case '8':
    updateImageForstory();
    break;
  case '9':
    updateChapterToStory();
    break;
  case '10':
    quetChuongTruyenConTrong(null, myArgs[1]);
    break;
  case '11':
    quetTruyenZero();
    break;
  case '12':
    getListChapter();
    break;
  case '13':
    syncAuthor();
    break;
  case '14':
    syncAllContentRef1000();
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}
var _default = exports["default"] = {
  getStoryDetail: getStoryDetail,
  getLinkInCategory: getLinkInCategory,
  getCategoriesFull: getCategoriesFull,
  getChapter: getChapter,
  getNewestStory: getNewestStory,
  updateNewStory: updateNewStory,
  updateChapter: updateChapter,
  quetChuongTruyenConTrong: quetChuongTruyenConTrong,
  quetTruyenZero: quetTruyenZero
};