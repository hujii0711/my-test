import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes( // user/CHECK, user/CHECK_SUCCESS, user/CHECK_FAILURE
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, user => user); // user/TEMP_SET_USER
export const check = createAction(CHECK); // user/CHECK
export const logout = createAction(LOGOUT); // user/LOGOUT

const checkSaga = createRequestSaga(CHECK, authAPI.check);

const checkFailureSaga = function() {
  try {
    localStorage.removeItem('user'); // localStorage 에서 user 제거하고
  } catch (e) {
    console.log('localStorage is not working');
  }
}

const logoutSaga = function* () {
  try {
    yield call(authAPI.logout); // logout API 호출
    localStorage.removeItem('user'); // localStorage 에서 user 제거
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null
};

//첫번째 파라미터로는 액션에 따라 실행할 함수들을 가지고있는 객체
//두번째 파라미터로는 상태의 기본 값 (initialState)
const user = handleActions(
  {
    //우리의 액션타입에는 접두사가 들어가있기 때문에 그냥 TEMP_SET_USER: 를 하면 안되고, [TEMP_SET_USER]: 로 해주어야합니다.
    //var action = {type: 'user/TEMP_SET_USER', payload: '{"_id":"6243f7ebd7d840a059415f06","username":"test"}'};
    //var {payload} = action; //console.log(payload); ==> '{"_id":"6243f7ebd7d840a059415f06","username":"test"}'
    //var {payload : user} = action; //console.log(user); ==> '{"_id":"6243f7ebd7d840a059415f06","username":"test"}'

    [TEMP_SET_USER]: function(state, {payload : user}) { 
      console.log("user.js >>>>> handleActions[TEMP_SET_USER] >>>>> state====", state); // {user: null, checkError: null};
      // return에 새로운 state
      return ({...state, user}); // {user: '{"_id":"6243f7ebd7d840a059415f06","username":"test"}', checkError: null}
    },
    
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error
    }),
    [LOGOUT]: state => { 
      console.log("user.js >>>>> handleActions[LOGOUT] >>>>> state====", state);
      return {...state, user: null}
    }
  },
  initialState,
);

export default user;
//const { user } = useSelector(({ user }) => {
  //  console.log(user);
  //  return { user: user.user };
  //});
