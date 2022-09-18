import { Users } from '../../models/users';
import bcrypt from 'bcryptjs';
import * as tokenConfig from '../../modules/token';

export const register = async (params: { email: string; username: string; password: string }) => {
  console.log('LoginService >>>> register >>>> params====', params);
  // { email: 'test2@daum.net', username: 'fujii0711', password: '1234' }
  const payload = params;

  // 아이디 또는 이메일 중복 제거 로직 필요

  // 비밀번호 암호화
  const hash = await bcrypt.hash(payload.password, 12);
  const data = await Users.create({
    user_id: 'hujii0711',
    user_name: '김형준',
    password: hash,
    email: payload.email,
    jwt: 'no token',
  });
  return data;
};
