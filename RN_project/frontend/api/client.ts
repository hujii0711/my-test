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
import axios from 'axios';
import {Alert, Platform, ToastAndroid} from 'react-native';

// __DEV__ 값을 통해 현재 환경이 개발 환경인지 아닌지 판단할 수 있습니다.
const baseURL = __DEV__ ? 'http://10.0.2.2:4000' : 'https://classloader.kr';
const client = axios.create({
  baseURL,
  timeout: 30 * 1000,
});

/*******************************************
  요청 인터셉터 2개의 콜백 함수를 받음
  요청 성공 직전 호출
********************************************/
client.interceptors.request.use(
  config => config,
  err => Promise.reject(err),
);

/*******************************************
  응답 인터셉터 2개의 콜백 함수를 받음
  return Promise.reject(err.response.data.message)가 없으면 업무에서 try-catch시 catch에서 에러를 잡을 수 없음
********************************************/
client.interceptors.response.use(
  //http status가 200인 경우 응답 성공 직전 호출. .then() 으로 이어짐.
  response => response,

  //http status가 200이 아닌 경우 응답 에러 직전 호출. .then() 으로 이어짐.
  err => {
    if (Platform.OS === 'ios') {
      Alert.alert('알림', err.response.data.message);
    } else {
      ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
    }

    if (err.response.data.returnType === 'list') {
      return {data: []};
    } else if (err.response.data.returnType === 'map') {
      return {data: {}};
    } else if (err.response.data.returnType === 'int') {
      return {data: 0};
    }
  },
);

/*******************************************
  서버 요청시 토큰 정보 저장
********************************************/
export function applyToken(jwt: string) {
  console.log('applyToken=============', jwt);
  //client.defaults.headers.authorization = `Bearer ${jwt}`;
  client.defaults.headers.common['Authentication'] = `${jwt}`;
}

/*******************************************
  서버 요청시 토큰 정보 삭제
********************************************/
export function clearToken() {
  delete client.defaults.headers.common['authorization'];
}

export default client;
