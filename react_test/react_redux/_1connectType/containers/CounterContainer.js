import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

// 3 유형
// 두번째 파라미터를 아예 객체 형태로 넣어 주면 connect 함수가 내부적으로 bindActionCreators 작업을 대신 해준다.
// export default connect(
//   state => ({
//     number: state.counter.number
//   }),
//   {
//     increase,
//     decrease
//   }
// )(CounterContainer);

// 2 유형
export default connect(
  state => ({
    number: state.counter.number
  }),
  dispatch => ({
    increase : () => dispatch(increase()),
    decrease : () => dispatch(decrease()),
  })
)(CounterContainer);

// 1 유형
// const mapStateToProps = (state) => ({ // state: 현재 스토어가 지니고 있는 상태
//   _number : state.counter.number
// });

// const mapDispatchToProps = (dispatch) =>({ // dispatch: 현재 스토어가 지니고 있는 내장함수 dispatch
//   _increase : () => {
//     dispatch(increase())
//   },
//   _decrease : () => {
//     dispatch(decrease())
//   }
// });
// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
