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

export const verifyToken = (token: string) => {
  console.log('########### modules > token.ts > verifyToken() ###########');
  if (!token) {
    return {
      status: 'E',
      message: '토큰이 없습니다.',
    };
  }

  try {
    const decoded = jwt.verify(token, env.jwt.secret);
    return {
      status: 'S',
      message: '토큰이 정상입니다.',
      user_id: decoded.userId,
      email: decoded.email,
      password: 'freepass',
      token,
    };
  } catch (err) {
    return {
      status: 'F',
      message: '토큰이 유효하지 않습니다.',
    };
  }
};
