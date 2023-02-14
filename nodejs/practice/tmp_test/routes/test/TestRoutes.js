const testRouter = require("express").Router();

testRouter.get("/", async (req, res, next) => {
  next();
});

testRouter.get("/index", async (req, res, next) => {
  res.render("index");
});

module.exports.router = testRouter;
