import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { Sequelize } from "./models";
import env from "./modules/env";
import * as Api from "./routes";
import session from "express-session";
import passport from "passport";
import passportConfig from './modules/passport';
import logger from "./modules/logger";
import rTracer from 'cls-rtracer';
import {errorConverter, errorHandler, error400Handler} from './modules/error';

const app = express();
passportConfig(); // 패스포트 설정
const port = env.port;

// 데이터베이스 연동 및 테이블 생성
(async () => {
  try {
    await Sequelize().authenticate();
    logger.info('✅DB connection success.');
    await Sequelize().sync({ force:false });
    logger.info('✅Success Create users Table');
  } catch (error) {
    logger.info("❗️Error in Create users Table : ", error);
  }
})();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(env.cookie.secret));

// 라우터 전에 세션 설정 요함(순서 중요!)
// secret : 필수 옵션이며, 세션을 암호화할 때 사용
// cookie
//   path : 쿠키 경로 설정
//   httpOnly : 클라이언트 측 자바스크립트를 통하여 쿠키에 접근을 제한
//   secure : HTTPS 필요
//   maxAge : 쿠키 유효기간 설정
// resave : 세션에 변경사항이 없어도 요청마다 세션을 다시 저장, 기본 옵션인 true는 deprecated 상태로 false 권장
// saveUninitialized : 세션에 저장할 내용이 없더라도 uninitialized 상태의 세션을 저장, 기본 옵션인 true는 deprecated 상태로 false 권장
// ※ 해당 설정으로 인해 라우터 호출마다 세션은 자동으로 갱신되어 유효기간도 연장된다.
app.use(
  session({
    name: "sessionData",
    secret: env.cookie.secret,
    resave: false,
    saveUninitialized: true,
    // store 설정 없으면 기본 값은 MemoryStore
    // Memory Store입니다. 메모리는 서버나 클라이언트를 껐다 키면 사라지는 휘발성
    // 이를 대체할 수 있는 방법은 File Store
    // cookie를 이용하여 세션을 관리해준다. 이때 maxAge 속성을 사용하여 이 쿠키가 얼마나 지속이 될것 인지 설정하는 부분
    cookie: {
      maxAge: env.max_age.session, // 1 hours (24 hours= 24 * 60 * 60 * 1000 ms)
      httpOnly : true
    },
  }),
);

app.use(passport.initialize()); // passport.initialize() 미들웨어는 request에 passport 설정을 담는다.
app.use(passport.session());// passport.session() 미들웨어는 request.session 객체에 passport 정보를 저장한다.
app.use(rTracer.expressMiddleware());

/*****************************************
 * 클라이언트의 모든 요청 로그 남김
 *****************************************/
app.use((req: Request, res: Response, next: NextFunction) => {
	const { method, path, url, query, headers: { cookie }, body } = req;
	const request = { method, path, cookie, body, url, query };
	logger.info({ request });
	next();
});

app.use(Api.path, Api.router);
/*****************************************
 * 등록되지 않은 라우터 처리(400)
 *****************************************/
app.use(error400Handler);

/*****************************************
 * 500 에러 처리 변환 라우터
 *****************************************/
app.use(errorConverter);

/*****************************************
 * 500 에러 처리 라우터
 *****************************************/
app.use(errorHandler);

app.listen(port, () => {
	console.log(`##################################################################################`);
	console.log(`======= ENV: ${env.node_env} =============`);
	console.log(`🚀 App listening on the port ${port}`);
	console.log(`##################################################################################`);
});
