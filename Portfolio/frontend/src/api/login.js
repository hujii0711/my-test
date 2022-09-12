import client from './client';

export async function register(params) {
  const response = await client.post('/login/register', params);
  return response.data;
}

export async function login(params) {
  const response = await client.post('/login/loginAction', params);
  return response.data;
}

export async function logout() {
  const response = await client.get('/login/logout');
  return response.data;
}

export async function getLoginStatus() {
  const response = await client.get('/login/status');
  return response.data;
}
