import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeLatest, select, throttle } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록 () => undefined 를 두번째 파라미터로 넣어줍니다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(increase()); // 특정 액션을 디스패치 합니다.
  const number = yield select(state => state.counter);
  console.log(`(increaseSaga)현재 값은 ${number}입니다.`);
}

function* decreaseSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(decrease()); // 특정 액션을 디스패치 합니다.
  const number = yield select(state => state.counter);
  console.log(`(decreaseSaga)현재 값은 ${number}입니다.`);
}

export function* counterSaga() {
  console.log("1111111 counter.js >>>> counterSaga ======",increaseSaga)
  // takeEvery 는 들어오는 모든 액션에 대하여 특정 작업을 처리해줍니다.
  // yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // 첫번째 파라미터: n초 * 1000
  yield throttle(3000, INCREASE_ASYNC, increaseSaga); //3번째 인자로 밀리초(숫자)를 받음, 그 시간 안에 한번만 take 가능하다.
  // 사가가 실행되는 주기를 제한하는 방법이다. takeEvery 대신 throttle이라는 함수를 사용하면 사가 n초에 단 한 번만 호출되도록 설정할 수 있다.
  // takeLatest 는 만약 기존에 진행중이던 작업이 있다면 취소처리 하고
  // 가장 마지막으로 실행된 작업만을 수행합니다.
  // function* watchInput(){
  //   yield throttle(500, 'INPUT_CHANGED', handleInput)
  // }
  // throttle 헬퍼 함수를 사용하며 watchInput는 0.5초동안 handleInput 작업을 수행하지 않는다. 동시에 가장 최신의 
  // 'INPUT_CHANGED' 액션을 buffer에 넣는다. 하여 0.5초의 지연 주기 사이에 발생하는 'INPUT_CHANGED' 액션들은 모두 놓치게 된다.
  // Saga는 0.5초의 지연 시간동안 최대 하나의 'INPUT_CHANGED' 액션을 수행하고 후행 액션을 처리할 수 있도록 보장한다.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
  console.log("2")
  // takeLatest 는 만약 기존에 진행중이던 작업이 있다면 취소처리 하고 가장 마지막으로 실행된 작업만을 수행합니다.
}

const initialState = 0; // 상태는 꼭 객체일 필요 없습니다. 숫자도 작동해요.

const counter = handleActions(
  {
    [INCREASE]: (state, action) => {
      return state + 1
    },
    [DECREASE]: state => state - 1
  },
  initialState
);

export default counter;
