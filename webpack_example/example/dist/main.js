(() => {
  "use strict";
  var e = {};
  (e.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      var t;
      e.g.importScripts && (t = e.g.location + "");
      var n = e.g.document;
      if (!t && n && (n.currentScript && (t = n.currentScript.src), !t)) {
        var r = n.getElementsByTagName("script");
        r.length && (t = r[r.length - 1].src);
      }
      if (!t)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      (t = t
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (e.p = t);
    })();
  const t = e.p + "ae87c274410fedb53073692ec2d631a3.jpg";
  document.getElementById("root").appendChild(
    (function ({ userList: e }) {
      const n = document.createElement("ul");
      return (
        e.forEach((e) => {
          n.appendChild(
            (function ({ name: e }) {
              const n = document.createElement("li");
              return (
                n.classList.add("user"),
                n.addEventListener("click", () => {
                  alert(e);
                }),
                (n.innerHTML = `\n\t\t<img src="${t}" alt="${e}" />\n\t\t${e}\n\t`),
                n
              );
            })({ name: e.name })
          );
        }),
        n
      );
    })({
      userList: [
        { id: 1, name: "블랙 위도우" },
        { id: 2, name: "아이언맨" },
        { id: 3, name: "헐크" },
        { id: 4, name: "스파이더맨" },
        { id: 5, name: "캡틴 아메리카" },
      ],
    })
  );
})();
