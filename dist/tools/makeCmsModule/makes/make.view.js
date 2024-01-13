"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _lodash = _interopRequireDefault(require("lodash"));
var _makeDir = _interopRequireDefault(require("make-dir"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var contentLayout = _fs["default"].readFileSync("".concat(__dirname, "/../views/partials/layout.basic.pug"), 'utf8');
var structDb = {};
var init = function init() {
  try {
    var _tableInit = require('../designdb/setup/' + global.tableSetup);
    structDb = _tableInit.tableGenerate(global);
  } catch (error) {
    console.log("========= table \"".concat(global.tableSetup, "\" must declare before build db !!! ========"));
    process.exit();
  }
};
var make = exports.make = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var pathView, pathViewContent, fileList, fileAdd, fileEdit, fileForm, fileValidation, jsFormload, tablejs, contentView, contentList, contentAdd, contentEdit, contentForm, contentValidation, contentJsFormload, contentTablejs;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          init();
          _context.prev = 1;
          console.log('================== BEGIN - BUILD VIEW ====================');
          pathView = "".concat(__dirname, "/../../../views/cms/pages/").concat(global.tableSetup);
          pathViewContent = "".concat(__dirname, "/../views");
          fileList = "".concat(pathView, "/list.pug");
          fileAdd = "".concat(pathView, "/add.pug");
          fileEdit = "".concat(pathView, "/edit.pug");
          fileForm = "".concat(pathView, "/_form.pug");
          fileValidation = "".concat(pathView, "/_validation.pug");
          jsFormload = "".concat(pathView, "/_jsformload.pug");
          tablejs = "".concat(pathView, "/_tablejs.pug");
          if (!_fs["default"].existsSync("".concat(pathView, "/list.pug"))) {
            _context.next = 17;
            break;
          }
          console.log("----- Folder ".concat(global.tableSetup, " view is exist => skip!\n"));
          return _context.abrupt("return");
        case 17:
          _context.next = 19;
          return (0, _makeDir["default"])(pathView);
        case 19:
          contentView = generateView();
          contentList = _fs["default"].readFileSync("".concat(pathViewContent, "/_list.pug"), 'utf8');
          contentAdd = _fs["default"].readFileSync("".concat(pathViewContent, "/_add.pug"), 'utf8');
          contentEdit = _fs["default"].readFileSync("".concat(pathViewContent, "/_edit.pug"), 'utf8');
          contentForm = _fs["default"].readFileSync("".concat(pathViewContent, "/_form.pug"), 'utf8');
          contentValidation = _fs["default"].readFileSync("".concat(pathViewContent, "/_validation.pug"), 'utf8');
          contentJsFormload = _fs["default"].readFileSync("".concat(pathViewContent, "/_jsformload.pug"), 'utf8');
          contentTablejs = _fs["default"].readFileSync("".concat(pathViewContent, "/_tablejs.pug"), 'utf8');
          contentList = contentList.replace(/_table_generate_/g, global.tableSetup).replace(/_init_table_fields/, JSON.stringify(contentView.initTableFields));
          contentAdd = contentAdd.replace(/_table_generate_/g, global.tableSetup);
          contentEdit = contentEdit.replace(/js_upload_form/g, contentView.contentUploadOnEdit.join('\n')).replace(/_table_generate_/g, global.tableSetup);
          contentForm = contentForm.replace(/_form_content_text/g, contentView.contentForm.join('\n    ')).replace(/_table_generate_/g, global.tableSetup);
          contentValidation = contentValidation.replace(/_plugin_ready_on_load/g, contentView.readyOnLoad.join('\n')).replace(/_rules_validate_load/g, contentView.validateNames).replace(/_msg_validate_load/g, contentView.validateMsgs).replace(/_table_generate_/g, global.tableSetup);
          contentJsFormload = contentJsFormload.replace(/_table_generate_/g, global.tableSetup);
          contentTablejs = contentTablejs.replace(/_table_generate_/g, global.tableSetup);
          console.log(".......process view...");
          _fs["default"].writeFile(fileList, contentList, function (err) {});
          _fs["default"].writeFile(fileAdd, contentAdd, function (err) {});
          _fs["default"].writeFile(fileEdit, contentEdit, function (err) {});
          _fs["default"].writeFile(fileForm, contentForm, function (err) {});
          _fs["default"].writeFile(fileValidation, contentValidation, function (err) {});
          _fs["default"].writeFile(jsFormload, contentJsFormload, function (err) {});
          _fs["default"].writeFile(tablejs, contentTablejs, function (err) {});
          console.log('================== END - BUILD VIEW ====================\n');
          _context.next = 48;
          break;
        case 45:
          _context.prev = 45;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
        case 48:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 45]]);
  }));
  return function make() {
    return _ref.apply(this, arguments);
  };
}();
var generateView = function generateView() {
  var structDb = tableInit.tableGenerate(global.tableSetup);
  var layout = _lodash["default"].cloneDeepWith(contentLayout);
  var contentForm = [];
  var validateNames = [];
  var validateMsgs = [];
  var initTableFields = [];
  var contentUploadOnEdit = [];
  var contentSelection = [];
  var contentSelectionMultiple = [];
  var onLoad = [];
  var readyOnLoad = [];
  var isCheckbox = false;
  var isSelect = false;
  var isDatepicker = false;
  var isDaterangePicker = false;
  var isDatetimerangePicker = false;
  var isDaterangeButton = false;
  var isRadio = false;
  var isTextarea = false;
  _lodash["default"].map(structDb.main, function (item, index) {
    var label = _fs["default"].readFileSync("".concat(__dirname, "/../views/partials/label.pug"), 'utf8').replace(/_label_form/, item.alias ? item.alias : item.field);
    var input = (_fs["default"].readFileSync("".concat(__dirname, "/../views/partials/").concat(item.typeView, ".pug"), 'utf8') + '\n').replace(/_input_name/g, item.field);
    if (item.typeView === 'input_select' || item.typeView === 'input_select_multiple') {
      // show option value with input selection
      var valueOptionArr = item.dataType.replace('ENUM(', '').replace(')', '').split(',');
      var layoutOption = valueOptionArr.map(function (it, index) {
        var x = it.replace(/"/g, '').replace(/'/g, "'");
        return index !== 0 ? "            option(value='".concat(x, "' data-image='' selected=data.").concat(item.field, "===''?true:false) ").concat(x) : "option(value='".concat(x, "' data-image='' selected=data.").concat(item.field, "===''?true:false) ").concat(x);
      });
      if (!layoutOption.length) {
        layoutOption = ["option(value='1' data-image='' selected=data.".concat(item.field, "===''?true:false) gi\xE1 tr\u1ECB 1")];
      }
      if (item.typeView === 'input_select') {
        contentSelection = layoutOption;
      } else {
        contentSelectionMultiple = layoutOption;
      }
      input = input.replace(/_default_value_multiple_select/g, contentSelectionMultiple.join('\n'));
      input = input.replace(/_default_value_select/g, contentSelection.join('\n'));
    }
    var itemInitTable = {
      field: item.field,
      title: item.alias || item.field
    };
    if (item.typeView === 'input_upload' || item.typeView === 'input_upload_multiple') {
      itemInitTable.formatter = 'imageFormatter';
    }
    initTableFields.push(itemInitTable);
    if (item.validate && (item.typeView === 'input_simple' || item.typeView === 'input_select_multiple')) {
      validateNames.push("".concat(item.field, ": {required: true}"));
      validateMsgs.push("".concat(item.field, ": 'Please enter ").concat(item.field, "'"));
      input = ".input-data-block\n          ".concat(input);
      contentForm.push(layout.replace(/_label_data/g, label).replace(/_input_data/g, input).replace(/_validation_require/, "(class=errors && errors.desc && 'has-error')"));
    } else {
      contentForm.push(layout.replace(/_label_data/g, label).replace(/_input_data/g, input).replace(/_validation_require/, ""));
    }
    if (item.typeView === 'input_checkbox') {
      isCheckbox = true;
    } else if (item.typeView === 'input_select' || item.typeView === 'input_select_multiple') {
      isSelect = true;
    } else if (item.typeView === 'input_datepicker') {
      isDatepicker = true;
    } else if (item.type === 'input_daterange_picker') {
      isDaterangePicker = true;
    } else if (item.type === 'input_datetimerange_picker') {
      isDatetimerangePicker = true;
    } else if (item.typeView === 'input_daterange_button') {
      isDaterangeButton = true;
    } else if (item.typeView === 'input_radio') {
      isRadio = true;
    } else if (item.typeView === 'input_textarea') {
      isTextarea = true;
    } else if (item.typeView === 'input_upload') {
      var contentUpload = _fs["default"].readFileSync("".concat(__dirname, "/../views/partials/js_upload.pug"), 'utf8');
      contentUploadOnEdit.push(contentUpload.replace(/_input_name/g, item.field));
    } else if (item.typeView === 'input_upload_multiple') {
      var _contentUpload = _fs["default"].readFileSync("".concat(__dirname, "/../views/partials/js_upload_multiple.pug"), 'utf8');
      contentUploadOnEdit.push(_contentUpload.replace(/_input_name/g, item.field));
    }
  });
  if (isSelect) {
    readyOnLoad.push(_fs["default"].readFileSync("".concat(__dirname, "/../views/partials/js_select.pug"), 'utf8'));
  }
  if (isTextarea) {
    readyOnLoad.push(_fs["default"].readFileSync("".concat(__dirname, "/../views/partials/js_textarea.pug"), 'utf8'));
  }
  validateNames = "{\n        ".concat(validateNames.join(',\n          '), "\n        }");
  validateMsgs = "{\n        ".concat(validateMsgs.join(',\n          '), "\n        }");
  var data = {
    validateNames: validateNames,
    validateMsgs: validateMsgs,
    readyOnLoad: readyOnLoad,
    onLoad: onLoad,
    contentForm: contentForm,
    contentUploadOnEdit: contentUploadOnEdit,
    initTableFields: initTableFields,
    contentSelection: contentSelection,
    contentSelectionMultiple: contentSelectionMultiple
  };
  return data;
};