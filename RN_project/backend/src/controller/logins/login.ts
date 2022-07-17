import { Request, Response } from "express";
import * as LoginService from "../../service/logins/login";
import { catchAsync } from "../../modules/error";

export const register = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await LoginService.register(body);

  res.json({
    code: "success",
    message: "정상적으로 회원가입이 완료 되었습니다.",
    resp: result,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { identifier } = req.body;
  const result = await LoginService.login(identifier);

  res.json({
    code: "success",
    message: "정상적으로 login 완료 되었습니다.",
    resp: result,
  });
});

export const getLoginStatus = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body;
    const result = await LoginService.getLoginStatus(body);

    res.json({
      code: "success",
      message: "정상적으로 getLoginStatus 완료 되었습니다.",
      resp: result,
    });
  },
);
