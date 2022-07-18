import jwt from "jsonwebtoken";
import { findByUserInfo } from "../service/users/user";
import { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

// declare module "express" {
//   export interface Request {
//     tokenUserInfo: {
//       id: string;
//       user_name: string;
//     };
//   }
// }

// export const generateToken = (user_id:string, user_name:string) => {
//     const payload = { user_id, user_name };
//     //const secretKey = process.env.JWT_SECRET;
//     const options = { expiresIn: 60 * 60 * 24 * 30 }; // 60 * 60 * 24 * 30 //30 days
//     return jwt.sign(payload, "KimHyungJun", options);
// };

export const generateToken = (params: { email: string; username: string; password: string }) => {
  const payload = params;
  //const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: 60 * 60 * 24 * 30 }; // 60 * 60 * 24 * 30 //30 days
  return jwt.sign(payload, "KimHyungJun", options);
};

// export const tokenRenewal = async (req: Request, res: Response, next: NextFunction) => {
//   console.log("########### 모든 라우터 공용 : 토큰 갱신 ###########");
//   const token = req.cookies.access_token;

//   // 토큰이 없는 경우 다음 미들웨이 진행
//   if (!token) {
//     //res.clearCookie('access_token', '', { httpOnly: true });
//     res.clearCookie("access_token");
//     //next()와 return next() 차이 있음
//     return next();
//   }

//   try {
//     const decoded = jwt.verify(token, "kimHyungJun");

//     req.tokenUserInfo = {
//       id: decoded.id,
//       user_name: decoded.username,
//     };

//     // 토큰 3.5일 미만 남으면 재발급
//     const now = Math.floor(Date.now() / 1000);

//     if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
//       const userInfo = await findByUserInfo(decoded.username);
//       const token = generateToken(userInfo.id, userInfo.username);
//       res.cookie("access_token", token, {
//         maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
//         httpOnly: true,
//       });
//     }
//     next();
//   } catch (err) {
//     next(err);
//   }
// };
