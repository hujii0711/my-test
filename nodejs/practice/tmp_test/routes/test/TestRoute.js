const testRouter = require("express").Router();
const TestController = require("../../controller/test/TestController");

testRouter.use("/", (req, res, next) => {
  next();
});

testRouter.get("/main", async (req, res, next) => {
  //const obj = { aaa: "AAA" , title: "넌적스 테스트" };
  //res.render("main", obj);
  const json = [
    { aaa: "AAA1", bbb: "BBB1" },
    { aaa: "AAA2", bbb: "BBB2" },
  ];
  res.render("main", { result: json });
});

testRouter.get("/select", TestController.selectTest);
testRouter.post("/insert", TestController.insertTest);
testRouter.patch("/update", TestController.updateTest);
testRouter.delete("/delete", TestController.deleteTest);

module.exports.router = testRouter;
