"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var catchHandle = function catchHandle(fn) {
  return function (req, res, next) {
    fn(req, res, next)["catch"](function (err) {
      console.log("======= catchProcessHandle:".concat(req.originalUrl), err);
      return res.render("".concat(res.locals.layoutPath, "/500"));
    });
  };
};
var _default = exports["default"] = catchHandle;