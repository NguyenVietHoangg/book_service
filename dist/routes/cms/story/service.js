"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveStoryDetailById = exports.getStoryList = exports.getStoryDetailById = exports["default"] = void 0;
var _lodash = _interopRequireWildcard(require("lodash"));
var _common = require("../../../config/common");
var _stringHelpers = require("../../../utils/stringHelpers");
var Model = _interopRequireWildcard(require("./../../../database/models"));
var _e = _interopRequireWildcard(require("../../../config/eResponse"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getStoryList = exports.getStoryList = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var conds,
      page,
      opts,
      pager,
      currentPage,
      offset,
      where,
      include,
      _yield$Model$story$fi,
      count,
      rows,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          conds = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
          page = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
          opts = _args.length > 2 && _args[2] !== undefined ? _args[2] : [];
          pager = _lodash["default"].cloneDeep(Model.pager);
          currentPage = page && page > 0 ? page : 1;
          offset = !(0, _lodash.isInteger)(page) ? 0 : (page - 1) * _common.LIMIT;
          where = {
            name: _defineProperty({}, Model.Sequelize.Op.like, conds['keySearch'] ? "%".concat(conds['keySearch'], "%") : '%%')
          };
          include = [{
            model: Model.media,
            as: 'medium'
          }];
          if (conds['status']) {
            where = _objectSpread(_objectSpread({}, where), {
              status: conds['status']
            });
          }
          if (!where.status) {
            if (conds.tab && conds.tab == '#trash') {
              where.status = 7; // bản ghi đã xóa
            } else {
              where.status = [1, 2, 3, 4, 5, 6];
            }
          }
          if (conds['categoryId']) {
            include = [].concat(_toConsumableArray(include), [{
              model: Model.category_has_story,
              where: {
                categoryId: conds['categoryId']
              },
              required: true
            }]);
          }
          if (conds['collectionId']) {
            include = [].concat(_toConsumableArray(include), [{
              model: Model.collection_has_story,
              where: {
                collectionId: conds['collectionId']
              },
              required: true
            }]);
          }
          _context.next = 14;
          return Model.story.findAndCountAll({
            where: where,
            include: include,
            offset: offset,
            limit: _common.LIMIT
          });
        case 14:
          _yield$Model$story$fi = _context.sent;
          count = _yield$Model$story$fi.count;
          rows = _yield$Model$story$fi.rows;
          rows = rows.map(function (item) {
            var obj = Model.getMediaSource(item.toJSON().medium);
            obj.url = obj.link;
            item.dataValues.medium = obj;
            return item;
          });
          pager = _objectSpread(_objectSpread(_objectSpread({}, pager), {
            totalPage: Math.ceil(count / _common.LIMIT)
          }), {}, {
            rows: rows,
            currentPage: currentPage
          });
          return _context.abrupt("return", pager);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getStoryList() {
    return _ref.apply(this, arguments);
  };
}();
var getStoryDetailById = exports.getStoryDetailById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id) {
    var where, row;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (id) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", null);
        case 2:
          where = {
            id: id
          };
          _context2.next = 5;
          return Model.story.findOne({
            where: where,
            include: [{
              model: Model.media
            }, {
              model: Model.category
            }, {
              model: Model.collection
            }, {
              model: Model.tag
            }]
          });
        case 5:
          row = _context2.sent;
          if (row.media && row.media.length) {
            row.dataValues.imageListIds = row.media.map(function (item) {
              return item.id;
            });
          }
          if (row.categories && row.categories.length) {
            row.dataValues.categoryIds = row.categories.map(function (item) {
              return item.id;
            });
          }
          if (row.collections && row.collections.length) {
            row.dataValues.collectionIds = row.tags.map(function (item) {
              return item.id;
            });
          }
          if (row.tags && row.tags.length) {
            row.dataValues.tagIds = row.tags.map(function (item) {
              return item.id;
            });
          }
          return _context2.abrupt("return", row);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getStoryDetailById(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var saveStoryDetailById = exports.saveStoryDetailById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id, data) {
    var item, images, refs, _loop, i;
    return _regeneratorRuntime().wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          item = null;
          if (!(!id || id == 'new')) {
            _context4.next = 12;
            break;
          }
          _context4.next = 4;
          return Model.story.findOne({
            where: {
              name: _defineProperty({}, Model.Sequelize.Op.eq, null)
            }
          });
        case 4:
          item = _context4.sent;
          if (item) {
            _context4.next = 9;
            break;
          }
          _context4.next = 8;
          return Model.story.create(Model.setupInsert({}));
        case 8:
          item = _context4.sent;
        case 9:
          id = item.id;
          _context4.next = 22;
          break;
        case 12:
          _context4.next = 14;
          return Model.story.findOne({
            where: {
              id: id
            }
          });
        case 14:
          item = _context4.sent;
          if (item) {
            _context4.next = 17;
            break;
          }
          return _context4.abrupt("return", null);
        case 17:
          item = item.toJSON();
          if (data.isActive) {
            data.status = 1;
          }
          data.slug = !data.slug && data.name ? (0, _stringHelpers.genSlug)(data.name, '-', 3) : (0, _stringHelpers.genSlug)(item.slug, '-', null);
          _context4.next = 22;
          return Model.story.update(Model.setupUpdate(data), {
            where: {
              id: id
            }
          });
        case 22:
          if (!(data.tab && data.tab == 'basic')) {
            _context4.next = 26;
            break;
          }
          _context4.next = 25;
          return Model.media_has_reftable.destroy({
            where: {
              refTableId: id
            }
          });
        case 25:
          if (data.imageListIds && data.imageListIds.length) {
            images = data.imageListIds.map(function (item) {
              var obj = Model.setupInsert({
                mediaId: item,
                refTableId: id,
                refTableName: 'story'
              });
              return obj;
            });
            Model.media_has_reftable.bulkCreate(images, {
              ignoreDuplicates: true
            });
          }
        case 26:
          if (!(data.tab && data.tab == 'ref')) {
            _context4.next = 35;
            break;
          }
          refs = ['category', 'collection', 'tag'];
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(i) {
            var refTable, items;
            return _regeneratorRuntime().wrap(function _loop$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  refTable = "".concat(refs[i], "_has_story");
                  _context3.next = 3;
                  return Model[refTable].destroy({
                    where: {
                      storyId: id
                    }
                  });
                case 3:
                  if (data["".concat(refs[i], "Ids")] && data["".concat(refs[i], "Ids")].length) {
                    items = data["".concat(refs[i], "Ids")].map(function (item) {
                      var obj = Model.setupInsert(_defineProperty(_defineProperty({}, "".concat(refs[i], "Id"), item), "storyId", id));
                      return obj;
                    });
                    Model[refTable].bulkCreate(items, {
                      ignoreDuplicates: true
                    });
                  }
                case 4:
                case "end":
                  return _context3.stop();
              }
            }, _loop);
          });
          i = 0;
        case 30:
          if (!(i < refs.length)) {
            _context4.next = 35;
            break;
          }
          return _context4.delegateYield(_loop(i), "t0", 32);
        case 32:
          i++;
          _context4.next = 30;
          break;
        case 35:
          return _context4.abrupt("return", id);
        case 36:
        case "end":
          return _context4.stop();
      }
    }, _callee3);
  }));
  return function saveStoryDetailById(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  getStoryList: getStoryList,
  getStoryDetailById: getStoryDetailById,
  saveStoryDetailById: saveStoryDetailById
};