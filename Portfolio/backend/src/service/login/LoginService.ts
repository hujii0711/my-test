import { Users } from '../../models/users';
import bcrypt from 'bcryptjs';
import * as tokenConfig from '../../modules/token';

export const register = async (body: { email: string; user_name: string; password: string }) => {
  console.log('LoginService >>>> register >>>> body====', body);
  // { email: 'test2@daum.net', user_name: 'fujii0711', password: '1234' }
  const payload = body;

  // 아이디 또는 이메일 중복 제거 로직 필요

  // 비밀번호 암호화
  const hash = await bcrypt.hash(payload.password, 12);
  const data = await Users.create({
    user_name: payload.user_name,
    password: hash,
    email: payload.email,
    //jwt: 'no token',
  });
  return data;
};

export const autoLogin = async (token: string) => {
  const data = tokenConfig.verifyToken(token);
  return data;
};
