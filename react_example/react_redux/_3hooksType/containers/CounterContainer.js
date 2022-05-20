import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = () => {
  
  // useSelector hooks를 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있다.
  // 상태 선택 함수는 mapStateToProps와 형태가 똑같다.
  // counter.number의 값을 조회함으로써 Counter에게 props를 넘겨준다.
  const number = useSelector(state => state.counter.number); // state => state.counter.number : 상태 선택 함수

  // useDispatch hooks는 컴포넌트 내부에서 스토어의 내장 함수 dispatch를 사용할 수 있게 해준다.
  // 컨테이너 컴포넌트에서 액션을 디스패치해야 할 때 사용한다.
  const dispatch = useDispatch();

  // 숫자가 바뀔때 컴포넌트가 리렌더링되는데 그 때 마다 onIncrease, onDecrease 함수가 새롭게 만들어지므로 성능 최적화를 위해 useCallback을 사용
  // useDispatch를 사용할 때는 useCallback과 함께 사용하기를 권장
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
