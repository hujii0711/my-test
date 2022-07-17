// /auth/local/register | POST | register | 회원가입
// /auth/local | GET | login |  로그인
// /users/me | GET | getLoginStatus | 로그인 상태
import { Users } from "../../models/users";
import jwt from "jsonwebtoken";

export const register = async (params: {
  email: string;
  username: string;
  password: string;
}) => {
  console.log("LoginService >>>> register >>>> params====", params);
  const payload = params;
  const options = { expiresIn: 60 * 60 * 24 * 30 }; // 60 * 60 * 24 * 30 //30 days
  var token = jwt.sign(payload, "KimHyungJun", options);
  const data = await Users.create({
    user_id: "fujii0711",
    user_name: payload.username,
    password: payload.password,
    email: payload.email,
    jwt: token,
  });
  return data;
};

export const login = async (email: string) => {
  console.log("LoginService >>>> login >>>> email====", email); //{ email: 'fujii0711@daum.net' }
  const data = await Users.findAll({
    attributes: [
      "id",
      "user_id",
      "user_name",
      "jwt",
      "email",
      "password",
      "confirmed",
      "provider",
      "created_at",
      "updated_at",
    ],
    where: {
      email,
    },
    raw: true,
  });
  return data;
};

export const getLoginStatus = async (params: {
  id: number;
  title: string;
  contents: string;
}) => {
  console.log("LoginService >>>> getLoginStatus >>>> params====", params);
  const data = await Users.findAll({
    where: {
      id: params,
    },
    raw: true,
  });
  return data;
};
