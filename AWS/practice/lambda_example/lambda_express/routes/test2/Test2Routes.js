const testRouter = require("express").Router();
const TestController = require("../../controller/test/TestController");

testRouter.use("/", (req, res, next) => {
  console.log("test 라우터 호출!!!!");
  next();
});

testRouter.get("/select", TestController.selectTest);
testRouter.post("/insert", TestController.insertTest);
testRouter.patch("/update", TestController.updateTest);
testRouter.delete("/delete", TestController.deleteTest);

module.exports.router = testRouter;
