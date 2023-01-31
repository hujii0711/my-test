const TestService = require("../../service/test/TestService");
const { catchAsync } = require("../../commons/error");
const httpStatus = require("http-status");

exports.selectTest = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await TestService.selectTest(query);
  res.json(result).status(httpStatus.OK);
});

exports.insertTest = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await TestService.insertTest(body);
  res.json(result).status(httpStatus.OK);
});

exports.updateTest = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await TestService.updateTest(body);
  res.json(result).status(httpStatus.OK);
});

exports.deleteTest = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await TestService.deleteTest(body);
  res.json(result).status(httpStatus.OK);
});
