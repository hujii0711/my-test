import { Request, Response } from "express";
import * as LoginService from "../../service/logins/login";
import {catchAsync} from "../../modules/error";

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
    const {user_id} = req.body;
    const result = await LoginService.login(user_id);

    const result_jwt : {
      jwt? : string
    } = {};

    const result_user : {
      user_id? : string;
      user_name? : string;
      email? : string;
    } = {};

    result.forEach(function(elem){
      result_jwt.jwt = elem.jwt;
      result_user.user_name = elem.user_name;
      result_user.user_id = elem.user_id;
      result_user.email = elem.email;
    })

    const realData = {
      jwt : result_jwt.jwt,
      user : result_user
    }

    res.json({
      code: "success",
      message: "정상적으로 login 완료 되었습니다.",
      resp: realData,
    });
  });
  
  export const getLoginStatus = catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
    const result = await LoginService.getLoginStatus(body);
  
    res.json({
      code: "success",
      message: "정상적으로 getLoginStatus 완료 되었습니다.",
      resp: result,
    });
  });
