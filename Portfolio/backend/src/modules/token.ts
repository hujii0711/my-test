import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import env from './env';
import ApiError from './api.error';
import logger from './logger';
import httpStatus from 'http-status';

export const generateToken = (id: number, userId: string, email: string) => {
  console.log('########### modules > token.ts > generateToken() ###########');
  try {
    const payload = { id, userId, email };
    const options = { expiresIn: env.max_age.token }; // 유효기간 30일
    const token = jwt.sign(payload, env.jwt.secret, options);
    return token;
  } catch (err) {
    logger.error(err);
    throw new ApiError(httpStatus.UNAUTHORIZED, '토큰이 발급 도중 오류가 발생하였습니다.');
  }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('########### modules > token.ts > verifyToken() ###########');
  try {
    const token = req.headers.authorization ?? '';

    // 토큰이 없는 경우
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, '토큰이 존재하지 않습니다.');
      // 추후 로그인 화면으로 이동
    }

    const decoded = jwt.verify(token, env.jwt.secret);
    //decoded는  jwt.sign(payload, env.jwt.secret, options)시 payload의 값을 리턴: {id, user_id, email} +iat, exp

    // 토큰 2일 미만 남으면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 2) {
      const newToken = generateToken(decoded.id, decoded.user_id, decoded.email);

      // 새로운 토큰 정보를 클라이언트 웹소켓에 싸줌
      // 해당 페이지가 언마운트시 웹소켓이 disconnet되므로 확인 필요
      // frontend의 전역 페이지인 App.js에서 웹소켓 통신 로직 넣어야 할 거 같음
      //let clientSocket = io.sockets.connected[user.socketId];
      //clientSocket.emit("event1", data);
      //req.app.get('io').of('/token').to(id).emit('newToken', newToken);
      //req.socket 확인
    }
    // 정상인 경우 다음 미들웨어 호출
    //next();
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, '토큰이 갱신 도중 오류가 발생하였습니다.');
  }
};
