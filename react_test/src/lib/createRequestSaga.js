import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestSaga(type, requestApi) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  
  return function*(action) {
    console.log("createRequestSaga[3] >>>>> type======", type);
    console.log("createRequestSaga[3] >>>>> action======", action);
    yield put(startLoading(type)); // 로딩 시작 //
    try {
      console.log("createRequestSaga[5] >>>>> action.payload======", action.payload);
      const response = yield call(requestApi, action.payload);
      console.log("createRequestSaga[6] >>>>> response======", response);
      yield put({
        type: SUCCESS,
        payload: response.data
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}

// loading.js[0] >>>>> startLoading_log==== {type: 'loading/START_LOADING'}
// sample.js [1] >>>>> sampleSaga!
// SampleContainer[2] >>>>> getPostDispatch
// SampleContainer[2] >>>>> getUsersDispatch!
// SampleContainer[one!] >>>>> useEffect!
// SampleContainer[one!] >>>>> async!
// createRequestSaga[3] >>>>> type====== sample/GET_POST
// createRequestSaga[3] >>>>> action====== {type: 'sample/GET_POST', payload: 1}
// loading.js[4] >>>>> action===== {type: 'loading/START_LOADING', payload: 'sample/GET_POST', @@redux-saga/SAGA_ACTION: true}
// loading.js[4] >>>>> action.payload===== sample/GET_POST
// createRequestSaga[5] >>>>> action.payload====== 1
// SampleContainer[2] >>>>> getPostDispatch
// SampleContainer[2] >>>>> getUsersDispatch!
// SampleContainer[API] >>>>> await getPostDispatch!
// createRequestSaga[3] >>>>> type====== sample/GET_USERS
// createRequestSaga[3] >>>>> action====== {type: 'sample/GET_USERS'}
// loading.js[4] >>>>> action===== {type: 'loading/START_LOADING', payload: 'sample/GET_USERS', @@redux-saga/SAGA_ACTION: true}
// loading.js[4] >>>>> action.payload===== sample/GET_USERS
// SampleContainer[2] >>>>> getPostDispatch
// SampleContainer[2] >>>>> getUsersDispatch!
// createRequestSaga[5] >>>>> action.payload====== undefined
// SampleContainer[API] >>>>> await getUsersDispatch!
// createRequestSaga[6] >>>>> response====== {data: {…}, status: 200, statusText: '', headers: {…}, config: {…}, …}
// SampleContainer[2] >>>>> getPostDispatch
// SampleContainer[2] >>>>> getUsersDispatch!
// SampleContainer[2] >>>>> getPostDispatch
// SampleContainer[2] >>>>> getUsersDispatch!
// createRequestSaga[6] >>>>> response====== {data: Array(10), status: 200, statusText: '', headers: {…}, config: {…}, …}
// SampleContainer[2] >>>>> getPostDispatch
// SampleContainer[2] >>>>> getUsersDispatch!
// SampleContainer[2] >>>>> getPostDispatch
// SampleContainer[2] >>>>> getUsersDispatch!

