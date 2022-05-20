import React, {useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseAsync, decreaseAsync } from '../modules/counter';
import Counter from '../components/Counter';

const CounterContainer = () => {

  const { number } = useSelector(state => ({
    number: state.counter
  }));

  const dispatch = useDispatch();
  const increaseAsyncDispatch = useCallback(() => dispatch(increaseAsync()), [dispatch]);
  const decreaseAsyncDispatch = useCallback(() => dispatch(decreaseAsync()), [dispatch]);

  return (
    <Counter
      number={number}
      onIncrease={increaseAsyncDispatch}
      onDecrease={decreaseAsyncDispatch}
    />
  );
};

export default React.memo(CounterContainer);
