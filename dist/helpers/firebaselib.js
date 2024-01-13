"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenFirebaseGenerate = exports.firebaseSms = void 0;
var _firebase = _interopRequireDefault(require("firebase"));
var _firebaseTokenGenerator = _interopRequireDefault(require("firebase-token-generator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var firebaseConfig = {
  apiKey: "AIzaSyCnrgwVKqZqKHwOHD9CIfAVvFyjoiSJz7A",
  authDomain: "hungsama-service.firebaseapp.com",
  databaseURL: "https://hungsama-service.firebaseio.com",
  projectId: "hungsama-service",
  storageBucket: "hungsama-service.appspot.com",
  messagingSenderId: "465876338708",
  appId: "1:465876338708:web:bd7cbfdc543de45cf97f01",
  measurementId: "G-CV5KSC92R7"
};
var firebaseSms = exports.firebaseSms = function firebaseSms() {
  var firebase = new _firebase["default"]();
};
var tokenFirebaseGenerate = exports.tokenFirebaseGenerate = function tokenFirebaseGenerate() {
  var tokenGenerator = new _firebaseTokenGenerator["default"](firebaseConfig.apiKey);
  var token = tokenGenerator.createToken({
    uid: "1",
    some: "arbitrary",
    data: "here"
  }, {
    admin: true
  });
  console.log('tokenFirebase', token);
};