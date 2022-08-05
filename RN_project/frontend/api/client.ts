import axios from 'axios';

// __DEV__ 값을 통해 현재 환경이 개발 환경인지 아닌지 판단할 수 있습니다.
const baseURL = __DEV__
  ? 'http://10.0.2.2:4000'
  : //? 'http://localhost:1337'
    'https://articles.example.com';

const client = axios.create({
  baseURL,
});

export function applyToken(jwt: string) {
  console.log('applyToken!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  client.defaults.headers.authorization = `${jwt}`;
  //client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';
}
export function clearToken() {
  delete client.defaults.headers.authorization;
}

export default client;
