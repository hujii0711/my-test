import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = ({ _number, _increase, _decrease }) => {
  return (
    <Counter number={_number} onIncrease={_increase} onDecrease={_decrease} />
  );
};

const mapStateToProps = (state) => ({ // state: 현재 스토어가 지니고 있는 상태
  _number : state.counter.number
});

const mapDispatchToProps = (dispatch) =>({ // dispatch: 현재 스토어가 지니고 있는 내장함수 dispatch
  _increase : () => {
    dispatch(increase())
  },
  _decrease : () => {
    dispatch(decrease())
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
