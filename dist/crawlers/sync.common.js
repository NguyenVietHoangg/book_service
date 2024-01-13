"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTotalStory = exports.updateTotalChapter = exports.updateStoryToCategory = exports.updateMedia = exports.updateImageForstory = exports.syncToCategoryStory = exports.syncRemoveDuplicate = exports.syncChapterNewest = exports.removeRefStory = exports.removeDuplicate = exports.itemSyncChapterNewest = exports["default"] = void 0;
var _saveUrlFile = require("./saveUrlFile");
var _common = require("../helpers/common");
var Model = _interopRequireWildcard(require("../database/models"));
var _sequelize = require("sequelize");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var updateImageForstory = exports.updateImageForstory = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var list, i, img, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Model['story'].findAll({
            attributes: ['id']
          });
        case 2:
          list = _context.sent;
          i = 0;
        case 4:
          if (!(i < list.length)) {
            _context.next = 14;
            break;
          }
          _context.next = 7;
          return (0, _saveUrlFile.imageRandom)();
        case 7:
          img = _context.sent;
          data = {
            imageSave: img
          };
          _context.next = 11;
          return Model['story'].update(data, {
            where: {
              id: list[i].id
            }
          });
        case 11:
          i++;
          _context.next = 4;
          break;
        case 14:
          console.log('xong updated updateImageForstory !!!!!!!');
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function updateImageForstory() {
    return _ref.apply(this, arguments);
  };
}();
var updateMedia = exports.updateMedia = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var list, i, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return listImagesOptimize();
        case 2:
          list = _context2.sent;
          i = 0;
        case 4:
          if (!(i < list.length)) {
            _context2.next = 11;
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
            createdAt: moment().format('YYYY/MM/DD HH:mm:ss'),
            updatedAt: moment().format('YYYY/MM/DD HH:mm:ss')
          };
          _context2.next = 8;
          return Model['media'].create(data);
        case 8:
          i++;
          _context2.next = 4;
          break;
        case 11:
          console.log('xong updated updateMedia !!!!!!!');
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function updateMedia() {
    return _ref2.apply(this, arguments);
  };
}();
var removeDuplicate = exports.removeDuplicate = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var storyObj,
      arr,
      slug,
      listRemove,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          storyObj = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
          if (storyObj) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return");
        case 3:
          arr = storyObj.slug.split('-');
          if (!parseInt(arr[arr.length - 1])) {
            _context3.next = 12;
            break;
          }
          slug = storyObj.slug.replace('-' + arr[arr.length - 1], '');
          _context3.next = 8;
          return Model.story.findAll({
            attributes: ['id', 'slug'],
            where: [{
              'slug': _defineProperty({}, _sequelize.Op.substring, slug)
            }, {
              'id': _defineProperty({}, _sequelize.Op.not, storyObj.id)
            }],
            order: [['id', 'desc']]
          });
        case 8:
          listRemove = _context3.sent;
          if (listRemove.length) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return");
        case 11:
          listRemove.map(function (item) {
            var regex = /\d/;
            var doesItHaveNumber = regex.test(item.slug);
            if (doesItHaveNumber && item.slug.length > slug.length) {
              Model.story.destroy({
                where: {
                  id: item.id
                }
              });
              Model.chapter.destroy({
                where: {
                  storyId: item.id
                }
              });
              Model.category_story.destroy({
                where: {
                  storyId: item.id
                }
              });
              Model.collection_story.destroy({
                where: {
                  storyId: item.id
                }
              });
              Model.tag_story.destroy({
                where: {
                  storyId: item.id
                }
              });
            }
          });
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function removeDuplicate() {
    return _ref3.apply(this, arguments);
  };
}();
var updateStoryToCategory = exports.updateStoryToCategory = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var storyId,
      categoryString,
      story,
      categroyList,
      _args5 = arguments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          storyId = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
          categoryString = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : null;
          if (!(!storyId || !categoryString)) {
            _context5.next = 4;
            break;
          }
          return _context5.abrupt("return");
        case 4:
          if (categoryString) {
            _context5.next = 9;
            break;
          }
          _context5.next = 7;
          return Model.story.findOne({
            attributes: ['genre'],
            where: {
              id: storyId
            }
          });
        case 7:
          story = _context5.sent;
          categoryString = story.genre;
        case 9:
          categroyList = categoryString.split(',');
          if (categroyList.length) {
            categroyList.map( /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(item) {
                var slug, cate, mapCates;
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      slug = (0, _common.xoaDau)(item);
                      if (slug) {
                        _context4.next = 3;
                        break;
                      }
                      return _context4.abrupt("return");
                    case 3:
                      _context4.next = 5;
                      return Model.category.findOne({
                        attributes: ['id'],
                        where: {
                          slug: slug
                        }
                      });
                    case 5:
                      cate = _context4.sent;
                      if (cate) {
                        _context4.next = 10;
                        break;
                      }
                      _context4.next = 9;
                      return Model.category.create({
                        name: item.trim(),
                        slug: slug
                      }, {
                        ignoreDuplicates: true
                      });
                    case 9:
                      cate = _context4.sent;
                    case 10:
                      mapCates = [{
                        storyId: storyId,
                        categoryId: cate ? cate.id : null
                      }];
                      Model.category_story.bulkCreate(mapCates, {
                        ignoreDuplicates: true
                      });
                    case 12:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              }));
              return function (_x) {
                return _ref5.apply(this, arguments);
              };
            }());
          }
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function updateStoryToCategory() {
    return _ref4.apply(this, arguments);
  };
}();
var syncToCategoryStory = exports.syncToCategoryStory = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var list,
      stop,
      i,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          list = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : [];
          stop = 2;
          i = 1;
        case 3:
          if (!(i < stop)) {
            _context6.next = 11;
            break;
          }
          _context6.next = 6;
          return Model.story.findAll({
            attributes: ['id', 'genre'],
            order: [['id', 'desc']],
            offset: (i - 1) * 1000,
            limit: 1000
          });
        case 6:
          list = _context6.sent;
          list.map(function (item) {
            updateStoryToCategory(item.id, item.genre);
          });
        case 8:
          i++;
          _context6.next = 3;
          break;
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function syncToCategoryStory() {
    return _ref6.apply(this, arguments);
  };
}();
var syncRemoveDuplicate = exports.syncRemoveDuplicate = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var list,
      stop,
      i,
      _args7 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          list = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : [];
          stop = 6;
          i = 1;
        case 3:
          if (!(i < stop)) {
            _context7.next = 11;
            break;
          }
          _context7.next = 6;
          return Model.story.findAll({
            attributes: ['id', 'slug'],
            order: [['id', 'desc']],
            offset: (i - 1) * 1000,
            limit: 1000
          });
        case 6:
          list = _context7.sent;
          list.map(function (item) {
            removeDuplicate(item);
          });
        case 8:
          i++;
          _context7.next = 3;
          break;
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function syncRemoveDuplicate() {
    return _ref7.apply(this, arguments);
  };
}();
var updateTotalStory = exports.updateTotalStory = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var result, cates;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return Model.category.findAll({
            attributes: ['id', 'slug', 'name'],
            where: {
              status: 'on'
            },
            raw: true
          });
        case 2:
          result = _context9.sent;
          console.log('=============== updateTotalStory === count = ' + result.length);
          if (!result.length) {
            _context9.next = 8;
            break;
          }
          _context9.next = 7;
          return Promise.all(result.map( /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(cate) {
              var count, sql;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return Model.story.count({
                      where: {
                        genre: _defineProperty({}, _sequelize.Op.substring, cate.name),
                        status: 'on'
                      },
                      order: [['id', 'asc']]
                    });
                  case 2:
                    count = _context8.sent;
                    sql = "UPDATE category set totalStory = " + count + " WHERE id = " + cate.id;
                    Model.sequelize.query(sql);
                  case 5:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x2) {
              return _ref9.apply(this, arguments);
            };
          }()));
        case 7:
          cates = _context9.sent;
        case 8:
          console.log('==== update totalStory ====');
          _context9.next = 11;
          return updateTotalChapter();
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function updateTotalStory() {
    return _ref8.apply(this, arguments);
  };
}();
var updateTotalChapter = exports.updateTotalChapter = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var storyId,
      where,
      sql,
      _args10 = arguments;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          storyId = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : null;
          return _context10.abrupt("return", true);
        case 7:
          _context10.next = 9;
          return Model.story.update({
            chapterSlugNewest: null,
            chapterNewest: null
          }, {
            where: {
              totalChapter: 0
            }
          });
        case 9:
          console.log('==== update updateTotalChapter ====');
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function updateTotalChapter() {
    return _ref10.apply(this, arguments);
  };
}();
var itemSyncChapterNewest = exports.itemSyncChapterNewest = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var storyId,
      item,
      _yield$Model$chapter$,
      count,
      _args11 = arguments;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          storyId = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : null;
          if (storyId) {
            _context11.next = 3;
            break;
          }
          return _context11.abrupt("return");
        case 3:
          _context11.next = 5;
          return Model.story.findOne({
            attributes: ['id', 'slug', 'updatedAt'],
            where: {
              id: storyId
            },
            include: [{
              model: Model.chapter,
              attributes: ['id', 'name', 'slugUnique'],
              order: [['id', 'desc']],
              limit: 1,
              required: true
            }]
          });
        case 5:
          item = _context11.sent;
          _context11.next = 8;
          return Model.chapter.findAndCountAll({
            where: {
              storyId: storyId
            },
            limit: 1
          });
        case 8:
          _yield$Model$chapter$ = _context11.sent;
          count = _yield$Model$chapter$.count;
          if (item.chapters[0]) {
            Model.story.update({
              totalChapter: count,
              chapterNewest: item.chapters[0].name,
              chapterSlugNewest: item.chapters[0].slugUnique,
              updatedAt: item.updatedAt
            }, {
              where: {
                id: item.id
              }
            });
          }
        case 11:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function itemSyncChapterNewest() {
    return _ref11.apply(this, arguments);
  };
}();
var syncChapterNewest = exports.syncChapterNewest = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    var limit, offset, i, stories;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          limit = 1000;
          offset = 0;
          i = 0;
        case 3:
          if (!(i < 2)) {
            _context12.next = 12;
            break;
          }
          offset = i * limit;
          _context12.next = 7;
          return Model.story.findAll({
            attributes: ['id', 'slug', 'updatedAt'],
            where: {
              status: 'on'
            },
            order: [['updatedAt', 'desc'], ['id', 'desc']],
            include: [{
              model: Model.chapter,
              attributes: ['id', 'name', 'slugUnique'],
              order: [['id', 'desc']],
              limit: 1,
              required: true
            }],
            limit: limit,
            offset: offset
          });
        case 7:
          stories = _context12.sent;
          stories.map(function (item) {
            if (item.chapters[0]) {
              Model.story.update({
                chapterNewest: item.chapters[0].name,
                chapterSlugNewest: item.chapters[0].slugUnique,
                updatedAt: item.updatedAt
              }, {
                where: {
                  id: item.id
                }
              });
            }
          });
        case 9:
          i++;
          _context12.next = 3;
          break;
        case 12:
          console.log("=== finished sync chapterest to story");
        case 13:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function syncChapterNewest() {
    return _ref12.apply(this, arguments);
  };
}();
var removeRefStory = exports.removeRefStory = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(storyId) {
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          if (storyId) {
            _context13.next = 2;
            break;
          }
          return _context13.abrupt("return");
        case 2:
          _context13.next = 4;
          return Model['chapter'].destroy({
            where: {
              storyId: storyId
            }
          });
        case 4:
          _context13.next = 6;
          return Model['collection_story'].destroy({
            where: {
              storyId: storyId
            }
          });
        case 6:
          _context13.next = 8;
          return Model['category_story'].destroy({
            where: {
              storyId: storyId
            }
          });
        case 8:
          _context13.next = 10;
          return Model['tag_story'].destroy({
            where: {
              storyId: storyId
            }
          });
        case 10:
          _context13.next = 12;
          return (0, _common.sleep)(2000);
        case 12:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function removeRefStory(_x3) {
    return _ref13.apply(this, arguments);
  };
}();
var myArgs = process.argv.slice(2);
switch (myArgs[0]) {
  case 'syncToCategoryStory':
    syncToCategoryStory();
    break;
  case 'syncRemoveDuplicate':
    syncRemoveDuplicate();
    break;
  case 'syncRemoveDuplicate':
    updateTotalStory();
    break;
  case 'updateTotalChapter':
    updateTotalChapter();
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}
var _default = exports["default"] = {
  updateImageForstory: updateImageForstory,
  updateMedia: updateMedia,
  updateStoryToCategory: updateStoryToCategory,
  syncToCategoryStory: syncToCategoryStory,
  syncRemoveDuplicate: syncRemoveDuplicate,
  updateTotalStory: updateTotalStory,
  removeRefStory: removeRefStory,
  itemSyncChapterNewest: itemSyncChapterNewest,
  syncChapterNewest: syncChapterNewest
};