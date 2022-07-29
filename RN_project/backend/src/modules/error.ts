import ApiError from './api.error';
import logger from './logger';
import { Request, Response, NextFunction } from 'express';
import env from './env';
import httpStatus from "http-status";
//import rTracer from 'cls-rtracer';

/**
 * 에러객체를 확인하고, 지정된 에러객체가 아니면 에러객체를 수정함
 */
export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log("errorConverter!!!");
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
	console.log("errorHandler!!!");
	let { statusCode, message } = err;

	const response: { code: number, message: string, stack: string | undefined } = {
		code: statusCode,
		message,
        stack: undefined 
	};

	if (['development'].includes(env.node_env)) { //array.includes("a"): 값이 하나라도 있으면 true
		response.stack = err.stack;
		logger.error(err);
	} else {
		// if (err.isFatal) {
		// 	sendErrorMessage({
		// 		...logger.fatal(err),
		// 		statusCode: err.statusCode || req.statusCode,
		// 		uid: rTracer.id()
		// 	})
		// } else {
		// 	logger.error(err)
		// }
	}

	res.status(statusCode).send(response);
};

/**
 * 400 에러 처리 핸들어
 */
export const error400Handler = (req: Request, res: Response, next: NextFunction) => {
	console.log("error400Handler!!!");
	const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
	res.status(httpStatus.NOT_FOUND).json({
		code: "fail",
		message: err.message,
	});
};

/**
 * try catch 처리
 */
export const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};