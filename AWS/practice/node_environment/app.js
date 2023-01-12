const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const nunjucks = require("nunjucks");
const indexRouter = require("./routes");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// aws region 및 자격증명 설정
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const s3 = new AWS.S3();
s3.listBuckets()
  .promise()
  .then((data) => {
    console.log("S3 : ", JSON.stringify(data, null, 2));
  });

app.set("port", process.env.PORT || 80);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use((req, res, next) => {
  next();
});

app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
