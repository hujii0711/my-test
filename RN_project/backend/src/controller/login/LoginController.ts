import { Request, Response, NextFunction } from "express";
import * as LoginService from "../../service/login/LoginService";
import { catchAsync } from "../../modules/error";
import passport from 'passport';

export const register = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await LoginService.register(body);

  res.json({
    code: "success",
    message: "정상적으로 회원가입이 완료 되었습니다.",
    resp: result,
  });
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
      res.json({
        code: "success",
        message: "정상적으로 login 완료 되었읍니다.",
        resp: "로그인 완료",
      });
    });
    
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

// export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const { identifier, password } = req.body;
//   const result = await LoginService.login(identifier, password);

//   // 등록되지 않는 아이디 오류
//   if (!result) {
//     const err = new Error("아이디를 정확히 입력하세요!");
//     return next(err);
//   }

//   // 비밀번호 불일치 에러
//   if (password !== result?.password) {
//     const err = new Error("비밀번호 불일치!");
//     return next(err);
//   }

//   // 로그인 이후 세션 정보 취득
//   if (req.session.userInfo === undefined) {
//     req.session.userInfo = {
//       user_id: result?.user_id,
//       user_name: result?.user_name,
//     };
//   }

//   res.json({
//     code: "success",
//     message: "정상적으로 login 완료 되었습니다.",
//     resp: result,
//   });
// });

export const getLoginStatus = catchAsync(async (req: Request, res: Response) => {
  //const body = req.body;
  //const result = await LoginService.getLoginStatus(body);
  console.log("getLoginStatus >>> req.user=====", req.user);
  res.json({
    code: "success",
    message: "정상적으로 getLoginStatus 완료 되었습니다.",
    resp: req.user,
  });
});
