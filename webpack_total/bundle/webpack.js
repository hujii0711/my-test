(() => {
  "use strict";
  var t = {};
  (t.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      var r;
      t.g.importScripts && (r = t.g.location + "");
      var e = t.g.document;
      if (!r && e && (e.currentScript && (r = e.currentScript.src), !r)) {
        var c = e.getElementsByTagName("script");
        c.length && (r = c[c.length - 1].src);
      }
      if (!r)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      (r = r
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (t.p = r);
    })();
  const r = t.p + "2272e2a5d03aa91909e1dacb8a30ce16.png";
  var e = '<img src="'.concat(r, '" alt="코딩앙마" />');
  document.getElementById("root").innerHTML = e + "<p>나는 코딩앙마~~</p>3";
})();
