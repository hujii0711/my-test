// 1. aws-serverless-express 패키지 활용!
const awsServerlessExpress = require("aws-serverless-express");
const express = require("express");
const router = require("./routes");
const error = require("./modules/error");
const passport = require("passport");
const app = express();
const {
  passportLocalConfig,
  sessionMiddleware,
} = require("./modules/passport/local");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 순서 주의!
passportLocalConfig();
app.use(sessionMiddleware);
app.use(passport.initialize()); // passport.initialize() 미들웨어는 request에 passport 설정을 담는다.
app.use(passport.session()); // passport.session() 미들웨어는 request.session 객체에 passport 정보를 저장한다.

/*****************************************
 * 클라이언트의 모든 요청
 *****************************************/
app.use((req, res, next) => {
  next();
});

/*****************************************
 * 업무 router
 *****************************************/
app.use(router);

/*****************************************
 * 등록되지 않은 라우터 처리(400)
 *****************************************/
app.use(error.error400Handler);

/*****************************************
 * 500 에러 처리 변환 라우터
 * new ApiError() 전처리
 *****************************************/
app.use(error.errorConverter);

/*****************************************
 * 500 에러 처리 라우터
 *****************************************/
app.use(error.errorHandler);

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
