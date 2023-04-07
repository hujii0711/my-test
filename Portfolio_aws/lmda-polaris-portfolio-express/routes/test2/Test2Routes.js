const test2Router = require("express").Router();
const Test2Controller = require("../../controller/test2/Test2Controller");

/*test2Router.use("/test2", (req, res, next) => {
  next();
});*/

test2Router.get("/test2", Test2Controller.selectTest);

module.exports.router = test2Router;