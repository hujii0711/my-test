import { Request, Response, NextFunction } from "express";
import * as LoginService from "../../service/login/LoginService";
import { catchAsync } from "../../modules/error";
import passport from 'passport';
import httpStatus from 'http-status';
import * as tokenConfig from "../../modules/token";
import env from "../../modules/env";

export const register = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await LoginService.register(body);
  res.json(result).status(httpStatus.OK);
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  passport.authenticate('local', (authError, user) => {

    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      return res.json({
        code: "fail",
        message: "사용자 정보가 없읍니다.",
        resp: "로그인 오류",
      });
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      //토큰 생성
      const { id, user_id, email } = user;
      const token = tokenConfig.generateToken({ id, user_id, email });

      //토큰 쿠키 생성
      res.cookie("access_token", token, {
        maxAge: env.max_age.token_cookie, // 30일
        httpOnly: true,
      });

      res.json({
        code: "success",
        message: "정상적으로 login 완료 되었읍니다.",
        resp: "로그인 완료",
      });
      // 로그인 이후 생성되는 데이터
      //req.user
      //req.session
      //req.cookies
      //req.tokenUserInfo
      //req.cookies.access_token
    });
    
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  // req.user 객체를 제거
  req.logout();

  // req.session 객체의 내용을 제거
  req.session.destroy((err) => {
    res.redirect('/');
  });

});

export const getLoginStatus = catchAsync(async (req: Request, res: Response) => {
  //const body = req.body;
  //const result = await LoginService.getLoginStatus(body);
  console.log("getLoginStatus >>> 세션 정보 req.user=====", req.user);
  console.log("getLoginStatus >>> 세션 정보 req.session=====", req.session);
  console.log("getLoginStatus >>> 세션 정보 req.cookies=====", req.cookies);
  console.log("getLoginStatus >>> 토큰 req.tokenUserInfo=====", req.tokenUserInfo);
  console.log("getLoginStatus >>> 토큰 쿠키 정보=====", req.cookies.access_token);
  res.json(req.user).status(httpStatus.OK);
});
