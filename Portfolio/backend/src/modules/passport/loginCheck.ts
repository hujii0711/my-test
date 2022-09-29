import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../modules/token';

// 로그인 여부를 isAuthenticated 메서드를 통해 파악할 수 있다.
// 로그인을 수행하면 토큰도 재발급된다.
// 세션 정보와 토큰 정보를 일원화해야
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    //토큰 검증 및 만료 임박시 재발급
    verifyToken(req, res, next);
    next();
  } else {
    const err = new Error('로그인한 이후에 이용하시기 바랍니다.');
    next(err);
  }
};

export const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    //토큰 검증 및 만료 임박시 재발급
    verifyToken(req, res, next);
    next();
  } else {
    const err = new Error('이미 로그인 상태입니다.');
    next(err);
  }
};
