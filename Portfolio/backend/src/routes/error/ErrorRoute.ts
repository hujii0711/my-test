import { Request, Response, NextFunction, Router } from 'express';
import ApiError from '../../modules/api.error';
import httpStatus from 'http-status';

export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('<<<<<< error 라우터 초기 미들웨어 >>>>>>');
  next();
});

router.get('/error500', async (req: Request, res: Response, next: NextFunction) => {
  //case1 --> 정상 X ( UnhandledPromiseRejectionWarning ) , async 빼면 정상
  //throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, '에러 테스트');

  //case2 --> 정상 O (err instanceof ApiError==== true)
  // const err = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, '에러 테스트');
  // next(err);

  //case3 --> 정상 O (err instanceof ApiError==== false)
  const err = new Error('에러 테스트');
  next(err);

  // next(err); 이후 errorConverter 모듈에서 공통 처리 함
});

router.get('/error400', async (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);

  res.status(httpStatus.NOT_FOUND).json({
    code: httpStatus.NOT_FOUND,
    message: err.message,
    err: err.stack,
  });
});

export default router;
