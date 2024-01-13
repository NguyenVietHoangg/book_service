"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeLog = void 0;
var timeLog = exports.timeLog = function timeLog(req, res, next) {
  console.log('===> Time: ', new Date().toLocaleString());
  next();
};