const express = require("express");
const router = require("./routes");
const app = express();
const error = require("./commons/error");
const nunjucks = require("nunjucks");

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.set("port", 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*****************************************
 * 클라이언트의 모든 요청 로그 남김
 *****************************************/
app.use((req, res, next) => {
  console.log("req=========", req);
  next();
});

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

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
