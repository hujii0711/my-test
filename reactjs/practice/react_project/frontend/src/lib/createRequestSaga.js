import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

// posts.js에서 const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPostsAction);
export default function createRequestSaga(type, requestApi) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) { //action은 action 객체 : { type : 'LIST_POSTS_SUCCESS', payload :{page, tag, username} }
    console.log('createRequestSaga >>>>> action======', action);
    //action : createAction(LIST_POSTS, action); 두번째 인자의 액션 객체 값
    yield put(startLoading(type)); // 로딩 시작
    try {
      // call: 함수를 동기적으로 실행시켜준다. 첫번째 파라미터는 함수, 두번째 파라미터는 해당 함수에 넣을 인수이다.
      // 서버에 API 통신할 때 사용 call에 두번째 인자는 서버에 요청할 파라미터 정보이다.
      const response = yield call(requestApi, action.payload); //listPostsServer = (page, username, tag)
      console.log('createRequestSaga >>>>> response======', response);
      
      // dispatch({ type : 'LIST_POSTS_SUCCESS', payload : response.data, meta : response })
      yield put({
        type: SUCCESS, //LIST_POSTS_SUCCESS
        //payload: response.data,
        payload: response.data.resp,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
