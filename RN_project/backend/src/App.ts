import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { Sequelize } from "./models";
import dotenv from "dotenv";
import * as Api from "./routes";
import session from "express-session";

dotenv.config({ path: path.resolve(__dirname, "./config/.env") });
const app = express();
const port = process.env.PORT || 4001;

// 데이터베이스 연동 및 테이블 생성
(async () => {
  try {
    await Sequelize().authenticate();
    console.log(`✅DB connection success.`);
    await Sequelize().sync({ force: false });
    console.log("✅Success Create users Table");
  } catch (error) {
    console.log("❗️Error in Create users Table : ", error);
  }
})();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// 라우터 전에 세션 설정 요함(순서 중요!)
app.use(
  session({
    secret: process.env.COOKIE_SECRET ?? "fujii0711",
    resave: false,
    saveUninitialized: true,
    // store 설정 없으면 기본 값은 MemoryStore
    // Memory Store입니다. 메모리는 서버나 클라이언트를 껐다 키면 사라지는 휘발성
    // 이를 대체할 수 있는 방법은 File Store
    cookie: { maxAge: 86400000 }, // 24 hours (= 24 * 60 * 60 * 1000 ms)
  }),
);
app.use(Api.path, Api.router);
/*****************************************
 * 등록되지 않은 라우터 처리(400)
 *****************************************/
app.use((req: Request, res: Response, next: NextFunction) => {
  console.error("등록되지 않은 라우터 처리__404!!!!!!!!!!!!!");
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  res.status(400).json({
    code: "fail",
    message: err.message,
  });
});

/*****************************************
 * 500 에러 처리 라우터
 *****************************************/
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("에러 처리 라우터__500__err.message", err.message);
  res.status(500).json({
    code: "fail",
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`
    ################################################
    🛡️  Server listening on port: ${port}
    ################################################`);
});
