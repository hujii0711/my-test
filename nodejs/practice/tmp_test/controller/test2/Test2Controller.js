const Test2Service = require("../../service/test2/Test2Service");
const error = require("../../commons/error");
const httpStatus = require("http-status");

exports.selectTest = error.catchAsync(async (req, res) => {
  const result = Test2Service.selectTest;
  res.json(result).status(httpStatus.OK);
});
