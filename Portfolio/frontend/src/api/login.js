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
  // reponse가 undefined일 때 따로 처리 front 에러 메시지 없이 하는 방법 고안 필요
  // user정보, jwt 정보 리턴됨 --> useLogin.js
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
