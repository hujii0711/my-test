import ApiError from './api.error';
import logger from './logger';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
//import rTracer from 'cls-rtracer';

/**
 * 에러객체를 확인하고, 지정된 에러객체가 아니면 에러객체를 수정함
 */
export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
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
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.log('errorHandler!!!');

  let { statusCode, message } = err;

  const response: { code: number; message: string; stack: string | undefined; returnType: string } = {
    code: statusCode,
    message,
    stack: err.stack,
    returnType: req.headers.returntype as unknown as string,
  };

  logger.error(err);
  res.status(statusCode).json(response);
};

/**
 * 400 에러 처리 핸들어
 */
export const error400Handler = (req: Request, res: Response, next: NextFunction) => {
  console.log('error400Handler!!!');
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);

  logger.error(err);
  res.status(httpStatus.NOT_FOUND).json({
    code: httpStatus.NOT_FOUND,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * try catch 처리
 */
export const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
