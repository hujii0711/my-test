import client from './client';

/*
  회원가입
*/
export async function register(params) {
  const response = await client.post('/login/register', params);
  return response.data;
}

/*
  로그인 수행
*/
export async function login(params) {
  const response = await client.post('/login/loginAction', params);
  return response.data;
}

/*
  로그아웃
*/
export async function logout() {
  const response = await client.get('/login/logout');
  return response.data;
}

/*
  세션 및 토큰 상태 확인
*/
export async function getLoginStatus() {
  const response = await client.get('/login/status');
  return response.data;
}
