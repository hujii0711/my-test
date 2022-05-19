import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/*
 요청을 위한 액션 타입을 payload 로 설정합니다 (예: "sample/GET_POST")
*/
//
export const startLoading = createAction(START_LOADING, function(requestType){
  return requestType;
});

//const startLoading_log = startLoading(); //startLoading_log==== {type: 'loading/START_LOADING'}
//console.log("loading.js[0] >>>>> startLoading_log====", startLoading_log);

export const finishLoading = createAction(
  FINISH_LOADING,
  requestType => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: function(state, action){
      console.log("loading.js[4] >>>>> action=====", action); 
      //{type: 'loading/START_LOADING', payload: 'sample/GET_POST', @@redux-saga/SAGA_ACTION: true}
      return {
        ...state,
        [action.payload]: true
      }
    },
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false
    })
  },
  initialState
);

export default loading;
