import axios from 'axios';

// __DEV__ 값을 통해 현재 환경이 개발 환경인지 아닌지 판단할 수 있습니다.
const baseURL = __DEV__
  ? 'http://10.0.2.2:4000'
  : //? 'http://localhost:1337'
    'https://articles.example.com';

const client = axios.create({
  baseURL,
  timeout: 30*1000
});

/*
    1. 요청 인터셉터
    2개의 콜백 함수를 받습니다.
*/
client.interceptors.request.use(
  function (config) {
      // 요청 성공 직전 호출됩니다.
      // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
      return config;
  }, 
  function (error) {
      // 요청 에러 직전 호출됩니다.
      return Promise.reject(error);
  }
);

/*
  2. 응답 인터셉터
  2개의 콜백 함수를 받습니다.
*/
client.interceptors.response.use(
  function (response) {
  /*
      http status가 200인 경우
      응답 성공 직전 호출됩니다. 
      .then() 으로 이어집니다.
  */
      return response;
  },

  function (error) {
  /*
      http status가 200이 아닌 경우
      응답 에러 직전 호출됩니다.
      .catch() 으로 이어집니다.    
  */
      return Promise.reject(error);
  }
);

export function applyToken(jwt: string) {
  console.log('applyToken!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  client.defaults.headers.authorization = `${jwt}`;
  //client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';
}
export function clearToken() {
  delete client.defaults.headers.authorization;
}

export default client;



/*
  글로벌 설정 예시:
  
  // API 주소를 다른 곳으로 사용함
  client.defaults.baseURL = 'https://external-api-server.com/' 

  // 헤더 설정
  client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

  // 인터셉터 설정
  axios.intercepter.response.use(\
    response => {
      // 요청 성공 시 특정 작업 수행
      return response;
    }, 
    error => {
      // 요청 실패 시 특정 작업 수행
      return Promise.reject(error);
    }
  })  
*/
