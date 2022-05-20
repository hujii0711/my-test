import React, { useReducer } from 'react';
//useReducer: useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 해주고 싶을 때 사용하는 Hook이다.
//이 Hook을 사용하면 state 값과 dispatch 함수를 받아온다. dispatch(action)과 같은 형태로,
//함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수 호출되는 구조이다.

// reducer는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환하는 함수이다.
// 불변성을 지키면서 업데이트한 새로운 상태를 반환한다.
function reducer(state, action) {
  // action.type 에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  // state: 현재 가리키고 있는 상태 값
  // dispatch: 액션을 발생시키는 함수
  // reducer: 리듀서 함수
  // { value: 0 }: 리듀서의 기본값
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );
};

export default App;
