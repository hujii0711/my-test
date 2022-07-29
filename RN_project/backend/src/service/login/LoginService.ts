import { Users } from "../../models/users";
import bcrypt from "bcryptjs";
import * as tokenConfig from "../../modules/token";

export const register = async (params: { email: string; username: string; password: string }) => {
  console.log("LoginService >>>> register >>>> params====", params);
  // { email: 'test2@daum.net', username: 'fujii0711', password: '1234' }
  const payload = params;
  //const token = tokenConfig.generateToken(payload);
  // 아이디 또는 이메일 중복 제거 로직 필요

  // 비밀번호 암호화
  const hash = await bcrypt.hash(payload.password, 12);
  const data = await Users.create({
    user_id: payload.username,
    user_name: payload.username,
    password: hash,
    email: payload.email,
    jwt: "no token",
  });
  return data;
};

export const getLoginStatus = async (params: { id: number; title: string; contents: string }) => {
  console.log("LoginService >>>> getLoginStatus >>>> params====", params);
  const data = await Users.findAll({
    where: {
      id: params,
    },
    raw: true,
  });
  return data;
};

// export const login = async (user_id: string, password: string) => {
//   console.log("LoginService >>>> login >>>> user_id====", user_id); //{ user_id: 'fujii0711@daum.net' }
//   console.log("LoginService >>>> login >>>> password====", password); //{ password: '1234' }

//   const data = await Users.findOne({
//     attributes: ["id", "user_id", "user_name", "jwt", "email", "password", "confirmed", "provider", "created_at", "updated_at"],
//     where: {
//       user_id,
//     },
//     raw: true,
//   });

//   return data;
// };
