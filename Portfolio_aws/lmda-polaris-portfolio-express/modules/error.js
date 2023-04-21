const httpStatus = require("http-status");

Error.stackTraceLimit = 10;

/*try{
  const error = new ApiError(400, "errorMessage", {stack:"stackMessage", isFatal:true})
  console.log("error----", error.message);
  console.log("error----", error.stack);
  console.log("error----", error.isFatal);
  console.log("error----", error.statusCode);
  throw new ApiError(400, "errorMessage1", {stack:"stackMessage1", isFatal:true});
}catch(err){
  console.log("err----", err.message);
  console.log("err----", err.stack);
  console.log("err----", err.isFatal);
  console.log("err----", err.statusCode);
}*/

class ApiError extends Error {
  constructor(statusCode, message, option) {
    super(message);
    this.statusCode = statusCode;
    if (option) {
      this.isFatal = option.isFatal === undefined ? false : option.isFatal;
      if (option.stack) {
        this.stack = option.stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    } else {
      this.isFatal = false;
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

exports.ApiError = ApiError;

/**
 * 에러객체를 확인하고, 지정된 ApiError 에러객체가 아니면 에러객체를 수정함
 */
exports.errorConverter = (err, req, res, next) => {
  console.log("errorConverter!!!");
  let error = err;
  if (!(err instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, err.stack);
  }
  next(error);
};

/**
 * 에러내용을 응답함
 */
exports.errorHandler = (err, req, res, next) => {
  console.log("errorHandler500!!!");

  let { statusCode, message } = err;

  const response = {
    code: statusCode,
    message,
    stack: err.stack,
  };
  console.error("errorHandler500 >>>>> response=====", response);
  res.status(statusCode).json(response);
};

/**
 * 400 에러 처리 핸들어
 */
exports.error400Handler = (req, res, next) => {
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  res.status(httpStatus.NOT_FOUND).json({
    code: httpStatus.NOT_FOUND,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * try catch 처리
 */
exports.catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.log("catchAsync >>> err =========", err);
    return next(err);
  });
};
