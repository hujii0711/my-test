var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 100);
});

Promise.all([p1, p2, p3]).then((values) => {
  console.log("values==========", values); // [3, 1337, "foo"]
});

Promise.race([p1, p2, p3]).then((value) => {
  console.log("value==========", value);
});
