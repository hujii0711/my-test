import axios from 'axios';
import {Alert, Platform, ToastAndroid} from 'react-native';
import Config from 'react-native-config';

const baseURL = Config.API_GATEWAY_EXPRESS_URL;
const client = axios.create({
  baseURL,
  timeout: 30 * 1000,
  //   validateStatus: status => {
  //     console.debug('axios response statusCode========', status);
  //     return false;
  //   },
});

/*
validateStatus
- validateStatus는 주어진 HTTP응답 상태 코드에 대해 promise의 반환 값이 resolve 또는 reject 할지 지정하도록 하는 옵션입니다.
- 만약 validateStatus의 반환 값을 true 로 한다면 promise는 resolve가 된다. 만약 false라면 promise는 reject를 반환합니다.
validateStatus: function (status) {
   return status >= 200 && status < 300; // default
}

*/
/*******************************************
  요청 인터셉터 2개의 콜백 함수를 받음
  요청 성공 직전 호출
********************************************/
client.interceptors.request.use(
  config => {
    //console.log('interceptors.request >>> config=====', config);
    /*{
      "adapter":[
         "Function xhrAdapter"
      ],
      "baseURL":"https://ies21c23jl.execute-api.ap-northeast-2.amazonaws.com/dev",
      "data":{
         "identifier":"hujii0711@gmail.com",
         "password":"1234"
      },
      "env":{
         "FormData":null
      },
      "headers":{
         "common":{
            "Accept":"application/json, text/plain,"
         },
         "delete":{
            
         },
         "get":{
            
         },
         "head":{
            
         },
         "patch":{
            "Content-Type":"application/x-www-form-urlencoded"
         },
         "post":{
            "Content-Type":"application/x-www-form-urlencoded"
         },
         "put":{
            "Content-Type":"application/x-www-form-urlencoded"
         }
      },
      "maxBodyLength":-1,
      "maxContentLength":-1,
      "method":"post",
      "timeout":30000,
      "transformRequest":[
         [
            "Function transformRequest"
         ]
      ],
      "transformResponse":[
         [
            "Function transformResponse"
         ]
      ],
      "transitional":{
         "clarifyTimeoutError":false,
         "forcedJSONParsing":true,
         "silentJSONParsing":true
      },
      "url":"/auth/localLogin",
      "validateStatus":[
         "Function validateStatus"
      ],
      "xsrfCookieName":"XSRF-TOKEN",
      "xsrfHeaderName":"X-XSRF-TOKEN"
   }*/
    return config;
  },
  err => {
    console.log('interceptors.request >>> err=====', err);
    return Promise.reject(err);
  },
);

/*******************************************
  응답 인터셉터 2개의 콜백 함수를 받음
  return Promise.reject(err.response.data.message)가 없으면 업무에서 try-catch시 catch에서 에러를 잡을 수 없음
********************************************/
client.interceptors.response.use(
  //http status가 200인 경우 응답 성공 직전 호출. .then() 으로 이어짐.
  response => {
    //console.log('interceptors.response >>> response=====', response);
    //console.log('interceptors.response >>> response=====', response);
    /*{
      "config":{
         "adapter":[
            "Function xhrAdapter"
         ],
         "baseURL":"https://ies21c23jl.execute-api.ap-northeast-2.amazonaws.com/dev",
         "data":"{\"identifier\":\"hujii0711@gmail.com\",\"password\":\"1234\"}",
         "env":{
            "FormData":null
         },
         "headers":{
            "Accept":"application/json, text/plain",
            "Content-Type":"application/json"
         },
         "maxBodyLength":-1,
         "maxContentLength":-1,
         "method":"post",
         "timeout":30000,
         "transformRequest":[
            [
               "Function transformRequest"
            ]
         ],
         "transformResponse":[
            [
               "Function transformResponse"
            ]
         ],
         "transitional":{
            "clarifyTimeoutError":false,
            "forcedJSONParsing":true,
            "silentJSONParsing":true
         },
         "url":"/auth/localLogin",
         "validateStatus":[
            "Function validateStatus"
         ],
         "xsrfCookieName":"XSRF-TOKEN",
         "xsrfHeaderName":"X-XSRF-TOKEN"
      },
      "data":{
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
         "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkN2ZiMzgzLWYwZjctNDkwNC04ZjZjLWNmMmJiOTMyNDdmMSIsInVzZXJJZCI6IjEwNjMxNzE5NDMwMDAzNDA4NTAwNSIsImVtYWlsIjoiaHVqaWkwNzExQGdtYWlsLmNvbSIsImlhdCI6MTY4MTc4MjkzMCwiZXhwIjoxNjg0Mzc0OTMwfQ.EsH_nkNdUc1rGoHfVS93w1o2LBbfyJpNNhgqDSsYJ5Y"
      },
      "headers":{
         "content-length":"708",
         "content-type":"application/json; charset=utf-8",
         "date":"Tue, 18 Apr 2023 01:55:31 GMT",
         "etag":"W/\"2c4-5hILpDxFsSHQmsVnyO3sWToLN9M\"",
         "set-cookie":[
            "connect.sid=s%3AymH5jBEdEmfZtxt5BahZ6tKglOR8kNlx.dj2%2FqOW268sSIyLBY6BuJYAo0xT%2BALVH8ehc6JUOGDE; Path=/; HttpOnly"
         ],
         "x-amz-apigw-id":"DjPGcGCzIE0FbGw=",
         "x-amzn-remapped-connection":"close",
         "x-amzn-remapped-content-length":"708",
         "x-amzn-remapped-date":"Tue, 18 Apr 2023 01:55:30 GMT",
         "x-amzn-requestid":"bc051c0b-1d0d-47ea-94c6-9f18c9f0fec7",
         "x-amzn-trace-id":"Root=1-643df88f-404276bd63d694c25d618e30;Sampled=0;lineage=9d27ee90:0",
         "x-powered-by":"Express"
      },
      "request":{
         "DONE":4,
         "HEADERS_RECEIVED":2,
         "LOADING":3,
         "OPENED":1,
         "UNSENT":0,
         "_aborted":false,
         "_cachedResponse":"undefined",
         "_hasError":false,
         "_headers":{
            "accept":"application/json, text/plain,",
            "content-type":"application/json"
         },
         "_incrementalEvents":false,
         "_lowerCaseResponseHeaders":{
            "content-length":"708",
            "content-type":"application/json; charset=utf-8",
            "date":"Tue, 18 Apr 2023 01:55:31 GMT",
            "etag":"W/\"2c4-5hILpDxFsSHQmsVnyO3sWToLN9M\"",
            "set-cookie":"connect.sid=s%3AymH5jBEdEmfZtxt5BahZ6tKglOR8kNlx.dj2%2FqOW268sSIyLBY6BuJYAo0xT%2BALVH8ehc6JUOGDE; Path=/; HttpOnly",
            "x-amz-apigw-id":"DjPGcGCzIE0FbGw=",
            "x-amzn-remapped-connection":"close",
            "x-amzn-remapped-content-length":"708",
            "x-amzn-remapped-date":"Tue, 18 Apr 2023 01:55:30 GMT",
            "x-amzn-requestid":"bc051c0b-1d0d-47ea-94c6-9f18c9f0fec7",
            "x-amzn-trace-id":"Root=1-643df88f-404276bd63d694c25d618e30;Sampled=0;lineage=9d27ee90:0",
            "x-powered-by":"Express"
         },
         "_method":"POST",
         "_perfKey":"network_XMLHttpRequest_https://ies21c23jl.execute-api.ap-northeast-2.amazonaws.com/dev/auth/localLogin",
         "_performanceLogger":{
            "_closed":false,
            "_extras":[
               "Object"
            ],
            "_pointExtras":[
               "Object"
            ],
            "_points":[
               "Object"
            ],
            "_timespans":[
               "Object"
            ]
         },
         "_requestId":null,
         "_response":"{\"sessionUser\":{\"created_dt\":1681739061104,\"user_id\":\"106317194300034085005\",\"token\":\"ya29.a0Ael9sCOMfUjS7J_CgXqQOtfYN2ofuTjZcV521mpfInGF4b4kj0ud85zVvryD26fBv5Qlv7aTs5t3chRf7ft2YseBQx7IEUVkrzwqhDiVQxMX04dzWjenmfnQLc3d34sI-xfxKSHRS_MJKxop3J1FXH01-G2JaCgYKAQkSARISFQF4udJhiz2e6HuaSIpIeCoWUi9pTQ0163\",\"id\":\"3d7fb383-f0f7-4904-8f6c-cf2bb93247f1\",\"email\":\"hujii0711@gmail.com\",\"user_name\":\"김형준\",\"language\":\"ko\",\"pwd\":\"1234\"},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkN2ZiMzgzLWYwZjctNDkwNC04ZjZjLWNmMmJiOTMyNDdmMSIsInVzZXJJZCI6IjEwNjMxNzE5NDMwMDAzNDA4NTAwNSIsImVtYWlsIjoiaHVqaWkwNzExQGdtYWlsLmNvbSIsImlhdCI6MTY4MTc4MjkzMCwiZXhwIjoxNjg0Mzc0OTMwfQ.EsH_nkNdUc1rGoHfVS93w1o2LBbfyJpNNhgqDSsYJ5Y\"}",
         "_responseType":"",
         "_sent":true,
         "_subscriptions":[
            
         ],
         "_timedOut":false,
         "_trackingName":"unknown",
         "_url":"https://ies21c23jl.execute-api.ap-northeast-2.amazonaws.com/dev/auth/localLogin",
         "readyState":4,
         "responseHeaders":{
            "content-length":"708",
            "content-type":"application/json; charset=utf-8",
            "date":"Tue, 18 Apr 2023 01:55:31 GMT",
            "etag":"W/\"2c4-5hILpDxFsSHQmsVnyO3sWToLN9M\"",
            "set-cookie":"connect.sid=s%3AymH5jBEdEmfZtxt5BahZ6tKglOR8kNlx.dj2%2FqOW268sSIyLBY6BuJYAo0xT%2BALVH8ehc6JUOGDE; Path=/; HttpOnly",
            "x-amz-apigw-id":"DjPGcGCzIE0FbGw=",
            "x-amzn-remapped-connection":"close",
            "x-amzn-remapped-content-length":"708",
            "x-amzn-remapped-date":"Tue, 18 Apr 2023 01:55:30 GMT",
            "x-amzn-requestid":"bc051c0b-1d0d-47ea-94c6-9f18c9f0fec7",
            "x-amzn-trace-id":"Root=1-643df88f-404276bd63d694c25d618e30;Sampled=0;lineage=9d27ee90:0",
            "x-powered-by":"Express"
         },
         "responseURL":"https://ies21c23jl.execute-api.ap-northeast-2.amazonaws.com/dev/auth/localLogin",
         "status":200,
         "timeout":30000,
         "upload":{
            
         },
         "withCredentials":true
      },
      "status":200,
      "statusText":"undefined"
    }*/
    return response;
  },

  //http status가 200이 아닌 경우 응답 에러 직전 호출. .then() 으로 이어짐.
  err => {
    if (Platform.OS === 'ios') {
      //Alert.alert('알림', err.response.data.message);
      Alert.alert('알림', err);
    } else {
      if (err.response.status === 500) {
        ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
      }
    }
  },
);

/*******************************************
  서버 요청시 토큰 정보 저장
********************************************/
export function putHeaderToken(jwt) {
  client.defaults.headers.common['authorization'] = `Bearer ${jwt}`;
}

/*******************************************
  서버 요청시 토큰 정보 삭제
********************************************/
export function deleteHeaderToken() {
  delete client.defaults.headers.common['authorization'];
}

export default client;
