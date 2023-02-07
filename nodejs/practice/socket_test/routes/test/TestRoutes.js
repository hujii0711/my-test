const testRouter = require("express").Router();

testRouter.get("/", async (req, res, next) => {
  next();
});

testRouter.get("/chat", async (req, res, next) => {
  var buffer = Buffer.from("hujii0711"); //<Buffer 68 75 6a 69 69 30 37 31 31>
  console.log("buffer----", buffer.toJSON);
  console.log("buffer2----", buffer.toString());
  res.render("chat");
});

module.exports.router = testRouter;
