import api from './client';

// 로그인
export const login = ({ username, password }) =>
  api.post('/api/auth/login', { username, password });

// 회원가입
export const register = ({ username, password }) =>
  api.post('/api/auth/register', { username, password });

// 로그인 상태 확인
export const check = () => api.get('/api/auth/check');

// 로그아웃
export const logout = () => api.post('/api/auth/logout');
