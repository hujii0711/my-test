import { Request, Response, NextFunction } from 'express';
import * as LoginService from '../../service/login/LoginService';
import { catchAsync } from '../../modules/error';
import passport from 'passport';
import httpStatus from 'http-status';
import * as tokenConfig from '../../modules/token';

export const register = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await LoginService.register(body);
  res.json(result).status(httpStatus.OK);
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (authError, user, options) => {
    console.log('login >>> authError========', authError);
    console.log('login >>> user========', user);
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      const err = new Error(options.message);
      return next(err);
    }

    return req.login(user, (loginError) => {
      console.log('login >>> req.login >>>> user========', user);
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      //토큰 생성
      const id = user.id;
      const userId = user.user_id;
      const email = user.email;
      const token = tokenConfig.generateToken(id, userId, email);

      const result = {
        user,
        jwt: token, //로그인이후 UI에 넘겨줄 token
      };
      console.log('login >>> 로그인 이후 result=====', result);
      res.json(result).status(httpStatus.OK);

      // 로그인 이후 생성되는 데이터
      //req.user
      //req.session
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  // req.user 객체를 제거
  req.logout();
  // req.session 객체의 내용을 제거
  req.session.destroy((err) => {
    res.json({ message: '로그아웃 성공!!' }).status(httpStatus.OK);
  });
});

export const getLoginStatus = catchAsync(async (req: Request, res: Response) => {
  console.log('getLoginStatus >>> 세션 정보 req.user=====', req.user);
  console.log('getLoginStatus >>> 세션 정보 req.session=====', req.session);
  //console.log('getLoginStatus >>> 토큰 req.tokenUserInfo=====', req.tokenUserInfo);

  const result = {
    user: req.user,
    session: req.session,
    isAuthenticated: req.isAuthenticated(),
  };

  res.json(result).status(httpStatus.OK);
});
