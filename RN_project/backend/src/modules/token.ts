import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import env from "./env"; 
import ApiError from './api.error';
import logger from "./logger";
import httpStatus from 'http-status';

//export const getSeochoHistory = catchAsync(async (req: Request<{ type: string }, {}, {}, { page: string, listSize: string }
export const generateToken = (params: { id: string; user_id: string, email: string }) => {
  console.log("########### 토큰 생성 ###########");
  try {
    const payload = params;
    const options = { expiresIn: env.max_age.token }; // 유효기간 30일
    const token = jwt.sign(payload, env.jwt.secret, options);
    logger.info({
      type: 'get',
      message: 'token',
      data: { token, payload },
    });
    return token;
	} catch (err) {
    logger.error(err);
		//throw err;
    throw new ApiError(httpStatus.UNAUTHORIZED, '토큰이 발급 도중 오류가 발생하였습니다.');
	}
};
// interface Request<
//         P = core.ParamsDictionary, //req.param
//         ResBody = any,            
//         ReqBody = any,             //req.body
//         ReqQuery = core.Query,     //req.query
//         Locals extends Record<string, any> = Record<string, any>,
// >
//catchAsync(async (req: Request<{ type: string }, {}, {}, { page: string, listSize: string }

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
console.log("########### 선택적 라우터 공용 : 토큰 검증 및 만료 임박시 재발급 ###########");
  try {
    //jwt.verify 메서드로 토큰을 검증할 수 있다.
    //req.headers.authorization : 토큰(요청 헤더에 저장된 토큰 정보)
    //위의 내용을 req.decoded에 대입하여 다음 미들웨어에서 쓸 수 있도록 한다.
    //req.decoded = jwt.verify(req.headers.authorization!, env.jwt.secret); // 클라이언트 요청

    const token = req.cookies.access_token; // 클라이언트 없이 가정 요청

    // 토큰이 없는 경우
    if (!token) {
      res.clearCookie("access_token");
      throw new ApiError(httpStatus.UNAUTHORIZED, '토큰이 존재하지 않습니다.');
      // 추후 로그인 화면으로 이동 
    }

    const decoded = jwt.verify(token, env.jwt.secret);
    //decoded는  jwt.sign(payload, env.jwt.secret, options)시 payload의 값을 리턴: {id, user_id, email} +iat, exp

    // 토큰 정보는 req.tokenUserInfo로 사용
    // 세션 정보는 req.user로 사용
    req.tokenUserInfo = {
      id: decoded.id,
      user_id: decoded.user_id,
      email: decoded.email,
    };

    // 토큰 3.5일 미만 남으면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      res.cookie("access_token", token, {
        maxAge: env.max_age.token_cookie, //30일
      });
    }
    next();

  } catch (err) {
    console.error(err);
    throw new ApiError(httpStatus.UNAUTHORIZED, '토큰이 갱신 도중 오류가 발생하였습니다.');
  }
};
