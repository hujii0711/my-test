const awsServerlessExpress = require("aws-serverless-express");
const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const error = require("./commons/error");
const nunjucks = require("nunjucks");
const app = express();

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("COOKIE_SECRET"));

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

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
