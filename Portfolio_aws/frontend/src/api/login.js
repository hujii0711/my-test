import client from './client';
/*
  1. 회원가입: register | /auth/register | post
  2. 로컬 전략 로그인 수행: login | /auth/login | post
  3. 로그아웃: logout | /auth/logout | get
  4. 로그인 여부 확인: loginStatus | /auth/loginStatus | get
  5. 자동로그인: autoLogin | /auth/autoLogin | get
*/

/**********************************
  1. 회원가입: register | /auth/register | post
**********************************/
export async function register(params) {
  console.log('api >>>> register >>>> params ====', params);
  const response = await client.post('/auth/register', params);
  return response.data;
}

/**********************************
  2. 로그인 수행: login | /auth/login | post
**********************************/
export async function login(params) {
  console.log('api >>>> login >>>> params =====', params);
  const response = await client.post('/auth/login', params);
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
  return response.data;
}

/**********************************
  3. 로그아웃: logout | /auth/logout | get
**********************************/
export async function logout(params) {
  console.log('api >>>> logout >>>> params ==============', params);
  const response = await client.post('/auth/logout', params);
  return response.data;
}

/**********************************
  4. 로그인 여부 확인: loginStatus | /auth/loginStatus | get
**********************************/
export async function loginStatus(id) {
  const response = await client.get('/auth/loginStatus', {
    params: {id},
  });
  return response.data;
}

/**********************************
  5. 자동로그인: autoLogin | /auth/autoLogin | get
**********************************/
export async function autoLogin(token) {
  console.log('api >>>> autoLogin >>>> token ====', token);
  const response = await client.get('/auth/autoLogin', {
    params: {token},
  });
  return response.data;
}

/**********************************
  6. 구글 oauth2 로그인 수행: googleLogin | /auth/google/login | get
**********************************/
export async function googleLogin() {
  console.log('api >>>> googleLogin====');
  await client.get('/auth/google/login');
}
