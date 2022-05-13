import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

// posts.js에서 const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export default function createRequestSaga(type, requestApi) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function*(action) { //action : createAction(LIST_POSTS, action); 두번째 인자의 액션 객체 값
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(requestApi, action.payload);
      // dispatch({ type : 'LIST_POSTS_SUCCESS', payload : response.data, meta : response })
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      })
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
