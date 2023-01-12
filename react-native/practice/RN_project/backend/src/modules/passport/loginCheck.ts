import { Request, Response, NextFunction } from "express";

// 로그인 여부를 isAuthenticated 메서드를 통해 파악할 수 있다.
export const isLoggedIn = (req:Request, res:Response, next: NextFunction) => {
  if (req.isAuthenticated()) { 
    next();
  } else {
    const err = new Error("로그인한 이후에 이용하시기 바랍니다.");
    next(err);
  }
};

export const isNotLoggedIn = (req:Request, res:Response, next: NextFunction) => {
  if (!req.isAuthenticated()) { 
    next();
  } else {
    const err = new Error("이미 로그인 상태입니다.")
    next(err);
  }
};
