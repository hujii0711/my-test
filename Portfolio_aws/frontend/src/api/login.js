import client from './client';
/*
  1. 로컬 전략 회원가입: register | /auth/local/register | post
  2. 로컬 전략 로그인 수행: login | /auth/local/login | post
  3. 로컬 전략 로그아웃: logout | /auth/local/logout | get
  4. 로컬 전략 자동로그인: autoLogin | /auth/local/autoLogin | get
*/

/**********************************
  1. 로컬 전략 회원가입: register | /auth/local/register | post
**********************************/
export const register = async params => {
  const response = await client.post('/auth/local/register', params);
  return response?.data;
};

/**********************************
  2. 로컬 전략 로그인 수행: login | /auth/local/login | post
**********************************/
export const login = async params => {
  //client.interceptors.response에서 에러에 걸리면 응답 값을 undefined가 됨
  const response = await client.post('/auth/local/login', params);
  return response?.data;

  /*{
    "sessionUser":{
       "created_dt":1681739061104,
       "email":"hujii0711@gmail.com",
       "id":"3d7fb383-f0f7-4904-8f6c-cf2bb93247f1",
       "language":"ko",
       "pwd":"1234",
       "token":"ya29.a0Ael9sCOMfUjS7J_CgXqQOtfYN2ofuTjZcV521mpfInGF4b4kj0ud85zVvryD26fBv5Qlv7aTs5t3chRf7ft2YseBQx7IEUVkrzwqhDiVQxMX04dzWjenmfnQLc3d34sI-xfxKSHRS_MJKxop3J1FXH01-G2JaCgYKAQkSARISFQF4udJhiz2e6HuaSIpIeCoWUi9pTQ0163",
       "user_id":"106317194300034085005",
       "user_name":"김형준"
    },
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkN2ZiMzgzLWYwZjctNDkwNC04ZjZjLWNmMmJiOTMyNDdmMSIsInVzZXJJZCI6IjEwNjMxNzE5NDMwMDAzNDA4NTAwNSIsImVtYWlsIjoiaHVqaWkwNzExQGdtYWlsLmNvbSIsImlhdCI6MTY4MTc4MDk2NywiZXhwIjoxNjg0MzcyOTY3fQ.QDUnXLXzxKDe-sIqAWIo27vbX-NynKjcY9CHIV4X9sg"
  }*/
};

/**********************************
  3. 로컬 전략 로그아웃: logout | /auth/local/logout | get
**********************************/
export const logout = async () => {
  const response = await client.get('/auth/local/logout');
  return response?.data;
};

/**********************************
  4. 로컬 전략 자동로그인: autoLogin | /auth/local/autoLogin | get
**********************************/
export const autoLogin = async autoId => {
  const response = await client.get('/auth/local/autoLogin', {
    params: {autoId},
  });
  //console.log('api >>>> autoLogin >>>> response ====', response);
  return response?.data;
};

/**********************************
  5. 구글 oauth2 로그인 수행: googleLogin | /auth/google/login | get
**********************************/
export const googleLogin = async params => {
  const response = await client.post('/auth/google/login', params);
  return response?.data;
};

/**********************************
 6. 로그인 이후 session 저장소 expires 갱신: updateSessionExpires | /auth/local/updateSessionExpires | get
**********************************/
export const updateSessionExpires = async () => {
  const response = await client.get('/auth/local/updateSessionExpires');
  return response?.data;
};
