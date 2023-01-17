"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));
var p1 = _promise.default.resolve(3);
var p2 = 1337;
var p3 = new _promise.default(function (resolve, reject) {
  (0, _setTimeout2.default)(function () {
    resolve("foo");
  }, 100);
});
_promise.default.all([p1, p2, p3]).then(function (values) {
  console.log("values==========", values); // [3, 1337, "foo"]
});

_promise.default.race([p1, p2, p3]).then(function (value) {
  console.log("value==========", value);
});