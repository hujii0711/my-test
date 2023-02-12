const testRouter = require("express").Router();

testRouter.get("/", async (req, res, next) => {
  next();
});

testRouter.get("/chat", async (req, res, next) => {
  res.render("chat");
});

module.exports.router = testRouter;
