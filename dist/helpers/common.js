"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xoaKhoangTrang = exports.xoaDau = exports.uniqueByObjectFieldInArray = exports.sleep = exports.removeEmptyField = exports.randomSetTimeout = exports.modifyQuery = exports.getQuarter = exports.getNameFromEmail = exports.getHostName = exports.getFilename = exports.getFileName2 = exports.getExt = exports.formatDate = exports.dayVnStr = exports.convertSlugStory = exports.clearUnicode = exports.cleanString = exports.checkValidUsername = exports.checkValidPhone = exports.checkValidPassword = exports.checkValidEmail = exports.betweenDateStr = exports.betweenDateNumber = exports.VndCurrencyFormat = exports.TravellerCollection = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _lodash = _interopRequireWildcard(require("lodash"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss';
var formatDate = exports.formatDate = function formatDate() {
  var dateUtc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return (0, _moment["default"])(dateUtc).format('DD-MM-YYYY HH:mm:ss');
};
var TravellerCollection = exports.TravellerCollection = /*#__PURE__*/function (_Array) {
  _inherits(TravellerCollection, _Array);
  var _super = _createSuper(TravellerCollection);
  function TravellerCollection() {
    _classCallCheck(this, TravellerCollection);
    return _super.apply(this, arguments);
  }
  _createClass(TravellerCollection, [{
    key: "sum",
    value: function sum(key) {
      return this.reduce(function (a, b) {
        return a + (b[key] || 0);
      }, 0);
    }
  }]);
  return TravellerCollection;
}( /*#__PURE__*/_wrapNativeSuper(Array));
var betweenDateStr = exports.betweenDateStr = function betweenDateStr(date1, date2) {
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'hour';
  var duration = _moment["default"].utc((0, _moment["default"])(date1, FORMAT_DATE).diff((0, _moment["default"])(date2, FORMAT_DATE))).format("HH:mm:ss");
  try {
    var str = '';
    var arr = duration.split(':');
    if (parseInt(arr[0]) === 0 && parseInt(arr[1]) === 0) {
      return duration;
    }
    if (parseFloat(arr[0]) > 0) {
      str += parseFloat(arr[0]) + ' giờ ';
    }
    if (parseInt(arr[1]) > 0) {
      str += parseInt(arr[0]) + ' phút ';
    }
    return str;
  } catch (error) {
    return 'Không xác định';
  }
};
var betweenDateNumber = exports.betweenDateNumber = function betweenDateNumber(date1, date2) {
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'seconds';
  return (0, _moment["default"])(date1, FORMAT_DATE).diff((0, _moment["default"])(date2, FORMAT_DATE), format);
};
var dayVnStr = exports.dayVnStr = function dayVnStr(date) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'short';
  var momentObj = date ? (0, _moment["default"])(date, FORMAT_DATE) : (0, _moment["default"])();
  if (type === 'short') {
    return momentObj.format('ddd') + ', ' + momentObj.format('D') + ' tháng ' + momentObj.format('M');
  }
};
var getQuarter = exports.getQuarter = function getQuarter(d) {
  d = d || (0, _moment["default"])();
  return d.format('MM') + '-' + d.format('YYYY');
};
var removeEmptyField = exports.removeEmptyField = function removeEmptyField(object) {
  Object.keys(object).forEach(function (key) {
    return (object[key] == null || object[key] == '') && delete object[key];
  });
  return object;
};
var checkValidPassword = exports.checkValidPassword = function checkValidPassword(pw) {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
  return regex.test(pw);
};
var checkValidEmail = exports.checkValidEmail = function checkValidEmail(em) {
  var regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return regex.test(em);
};
var checkValidUsername = exports.checkValidUsername = function checkValidUsername(em) {
  var re = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  return re.test(String(em).toLowerCase());
};
var getNameFromEmail = exports.getNameFromEmail = function getNameFromEmail(email) {
  var name = email.substring(0, email.lastIndexOf("@"));
  var domain = email.substring(email.lastIndexOf("@") + 1);
  return {
    name: name,
    domain: domain
  };
};
var checkValidPhone = exports.checkValidPhone = function checkValidPhone(em) {
  var re = /^[+(]*[(+]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  return em.match(re) ? em : false;
};
var VndCurrencyFormat = exports.VndCurrencyFormat = function VndCurrencyFormat(number) {
  return number.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND'
  });
};
var uniqueByObjectFieldInArray = exports.uniqueByObjectFieldInArray = function uniqueByObjectFieldInArray(array, field) {
  var flags = [],
    output = [],
    outputLocked = [],
    l = array.length,
    i;
  for (i = 0; i < l; i++) {
    if (flags[array[i][field]]) {
      outputLocked.push(array[i]);
      continue;
    }
    flags[array[i][field]] = true;
    output.push(array[i]);
  }
  return {
    output: output,
    outputLocked: outputLocked
  };
};
var modifyQuery = exports.modifyQuery = function modifyQuery() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!_lodash["default"].isEmpty(data)) {
    var query = {
      where: {},
      offset: 0,
      limit: 20
    };
    if (data.keySearch && !data.keySearch.includes('-')) {
      query.where.keySearch = data.keySearch;
    }
    if (data.keySearch && data.keySearch.includes('-')) {
      query.where.keySearchSlug = data.keySearch;
    }
    if (data.q) {
      query.where.keySearch = data.q;
    }
    if (data.status) {
      query.where.status = data.status;
    }
    if (data.fromId && data.fromId != '') {
      query.where.crawlerFrom = data.fromId;
    }
    if (data.haveChapter && data.haveChapter != '') {
      query.where.haveChapterContent = data.haveChapter == 1 ? 1 : 0;
    }
    if (data.updatedBy) {
      query.where.updatedBy = data.updatedBy;
    }
    if (data.start_date) {
      query.where.start_date = data.start_date;
    }
    if (data.end_date) {
      query.where.end_date = data.end_date;
    }
    if (data.offset) {
      query.offset = data.offset;
    }
    if (data.limit) {
      query.limit = data.limit;
    }
    return query;
  }
};
var getHostName = exports.getHostName = function getHostName() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  } else {
    return null;
  }
};
var xoaDau = exports.xoaDau = function xoaDau(str) {
  var _char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!str) {
    return null;
  }
  var newStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace('%', '').replace(/  +/g, ' ').toLowerCase();
  if (_char) {
    newStr = newStr.replace(' ', _char);
  }
  var stringSplitted = newStr.split(' ');
  stringSplitted.forEach(function (e) {
    e.trim();
  });
  newStr = stringSplitted.filter(function (x) {
    return typeof x === 'string' && x.length > 0;
  }).join('-');
  newStr = newStr.replace(/“/g, '').replace(/,/g).replace(/:-/g, '-').replace(/\?/g, '').replace(/”/g, '').replace('[', '').replace(']', '').replace('\n', '').replace('  ', '').replace(/undefined/g, '');
  var arr = newStr.match(/[a-zA-Z-0-9]+/g);
  if (!arr) {
    return null;
  }
  return arr.join('-').toLocaleString();
};
var xoaKhoangTrang = exports.xoaKhoangTrang = function xoaKhoangTrang(str) {
  var _char2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
  if (!str) {
    return;
  }
  var newStr = str.replace(/  +/g, _char2);
  return newStr;
};
var getFilename = exports.getFilename = function getFilename(url) {
  if (url) {
    var m = url.toString().match(/.*\/(.+?)\./);
    if (m && m.length > 1) {
      return m[1];
    }
  }
  return "";
};
var getFileName2 = exports.getFileName2 = function getFileName2(url) {
  return url.substring(url.lastIndexOf('/') + 1);
};
var getExt = exports.getExt = function getExt(url) {
  var ext = url.split('.').pop();
  ext = ext ? ".".concat(ext) : '';
  return ext;
};
var cleanString = exports.cleanString = function cleanString(input) {
  if (!input) {
    return null;
  }
  var output = "";
  for (var i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i);
    }
  }
  return output;
};
var clearUnicode = exports.clearUnicode = function clearUnicode(input) {
  if (input) {
    return input.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
  }
  return null;
};
var convertSlugStory = exports.convertSlugStory = function convertSlugStory(input) {
  if (!input) {
    return null;
  }
  input = string.replace(/\s\s+/g, '-');
  return xoaDau(input);
};
var sleep = exports.sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};
var randomSetTimeout = exports.randomSetTimeout = function randomSetTimeout() {
  var use = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  if (use == 1) {
    var months = [10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  } else {
    var months = [1000, 1300, 1500, 1700, 2000];
  }
  var random = Math.floor(Math.random() * months.length);
  return random;
};