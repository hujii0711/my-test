/*
Axios는 API에서 400, 500번대 응답이 오면 에러로 판단해 Promise.reject(AxiosError)를 반환한다.
그리고 이렇게 받은 AxiosError 객체로 에러에 해당하는 액션(스낵바 호출 등)을 실행하게 된다.
그런데 만약 200, 300번대 응답도 에러로 처리해야 할 상황이 발생하면 어떻게 해야 할까?
이런 경우는 거의 없지만, 개발을 하다 보면 서버와 불가피한 약속을 해야 할 때도 있고,
벌크 액션을 실행했을 때 몇 개는 성공하고 몇 개는 실패해 응답코드를 서버에서 내려준 것과 다르게 해석해야 할 수도 있다.
공통으로 에러를 처리하기 위해, 우선 Axios Instance를 생성하는 함수를 만들자.
이렇게 에러의 범위를 정해주면 Axios는 그에 맞게 성공과 실패를 판단하게 된다. 그런데 이 경우에는 모든 200, 300번대 응답을 에러로 반환한다는 문제가 있다. 200이 떨어지더라도 특정 상황에서만 에러를 반환하려면 어떻게 해야 할까?

interceptors
Axios는 응답이 성공이나 실패했을 때 이를 가로채 데이터의 가공을 돕는 interceptors라는 것을 지원한다. 이를 사용하면 성공 응답일 때 Promise.reject()를 반환해 에러를 직접 발생시킬 수 있다.
그런데 만약 에러 내부에 다른 데이터도 담아 보내고 싶으면 어떻게 해야 할까? 위에서 만든 기본 Error 객체의 경우에는 message 정도밖에 담을 수가 없다.

CustomError
Error 객체를 extends하는 CustomError를 만들어 여러 정보를 담을 수 있다.
*/
import axios from 'axios';

interface IErrorResponse {
  statusCode: number;
  message: string;
  name: string;
}

class CustomError extends Error {
  response: IErrorResponse;
  constructor(message: string, response: IErrorResponse) {
    super(message);
    this.response = response;
  }
}

const createAxiosInstance = (options: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    timeout: 60 * 1000,
    ...options,
  });

  const onFulfilled = (response: AxiosResponse) => {
    if (response.data.statusCode === 400) {
      // CustomError 인스턴스를 만들어 담는다.
      const customError = new CustomError(response.data.message, response.data);
      return Promise.reject(customError);
    }
    return response;
  };

  axiosInstance.interceptors.response.use(onFulfilled);
  return axiosInstance;
};
