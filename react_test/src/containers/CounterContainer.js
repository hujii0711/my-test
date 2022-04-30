import React from 'react';
import { connect } from 'react-redux';
import { increaseAsync, decreaseAsync } from '../modules/counter';
import Counter from '../components/Counter';

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
  console.log("2222222222 CounterContainer >>>>> number, increaseAsync, decreaseAsync======", number, increaseAsync, decreaseAsync );
  return (
    <Counter
      number={number}
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
    />
  );
};

//mapStateToProps : 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
// const mapStateToProps = (state) => ({ // state: 현재 스토어가 지니고 있는 상태
//   number : state.counter
// });

// //mapDispatchToProps : 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
// const mapDispatchToProps = (dispatch) =>({ // dispatch: 현재 스토어가 지니고 있는 내장함수 dispatch
//   increaseAsync,
//   decreaseAsync
// });

//export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

export default connect(
  //mapReduxStateToReactProps : 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
  //   return {
  //     number:state.number
  //   };
  state => ({
    number: state.counter
  }),
  //mapReduxDispatchToReactProps : 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
  //현재 스토어가 지니고 있는 내장함수 dispatch
  //   return {
  //       onClick:function(size) {
  //           dispatch({type:'INCREMENT', size:size});
  //       }
  //   }
  {
    increaseAsync,
    decreaseAsync
  }
)(CounterContainer);
