import client from './client';
import {AuthResult, User} from './types';
// export interface AuthResult {
//   jwt: string;
//   user:{
//     id: number,
//     user_id: string,
//     user_name: string,
//     email: string,
//     password: string,
//     confirmed: boolean,
//     provider: string,
//     created_at: Date,
//     updated_at: Date
// };
export async function register(params: RegisterParams) {
  const response = await client.post<AuthResult>('/auth/local/register', params);
  const data = response.data.resp;

  // strapi 응답에 맞게 변환 작업
  const result = {
    jwt: data.jwt,
    user: {
      id: data.id,
      user_id: data.user_id,
      user_name: data.user_name,
      email: data.email,
      password: data.password,
      confirmed: data.confirmed,
      provider: data.provider,
      published_at: data.published_at,
      created_at: data.created_at,
      updated_at: data.updated_at,
    },
  };
  console.log('api >>> register >>> result ===', result);
  return result;
}

export async function login(params: LoginParams) {
  const response = await client.post<AuthResult>('/auth/local', params);
  const data = response.data.resp;

  // strapi 응답에 맞게 변환 작업
  const result = {
    jwt: data.jwt,
    user: {
      id: data.id,
      user_id: data.user_id,
      user_name: data.user_name,
      email: data.email,
      password: data.password,
      confirmed: data.confirmed,
      provider: data.provider,
      published_at: data.published_at,
      created_at: data.created_at,
      updated_at: data.updated_at,
    },
  };
  console.log('api >>> login >>> result ===', result);
  return result;
}

export async function getLoginStatus() {
  const response = await client.get<User>('/users/me');
  return response.data;
}

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

interface LoginParams {
  identifier: string;
  password: string;
}
