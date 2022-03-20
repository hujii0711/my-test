import React, { useState } from 'react';
import './style.css';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch, connect } from 'react-redux';
//useSelector 어떤 컴포넌트를 쓰고 싶은지 선택하는 것
//connect은 재사용할때 편리
function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      number: 1,
    };
  }
  const newState = { ...currentState }; //과거의 객체가 복제되고 복제본을 리턴하면 불변성을 유지
  if (action.type === 'PLUS') {
    newState.number++;
  }
  return newState;
}
const store = createStore(reducer);
export default function App() {
  return (
    <div id="container">
      <h1>Root</h1>
      <div id="grid">
        <Provider store={store}>
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}
function Left1(props) {
  return (
    <div>
      <h1>Left1 </h1>
      <Left2></Left2>
    </div>
  );
}
function Left2(props) {
  console.log('2');
  return (
    <div>
      <h1>Left2 : </h1>
      <Left3></Left3>
    </div>
  );
}
function Left3(props) {
  console.log('3');
  //useSelector사용하고 있는 컴포넌트만 render 되는 것이라서 성능 향상에 좋다
  //reducer의 return 값이 number를 사용하고 싶을때
  const number = useSelector((state) => state.number);
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  );
}
function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}
function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}
function Right3(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <input
        type="button"
        value="+"
        onClick={() => {
          // PLUS라는 action 전달 --> reducer 호출
          dispatch({ type: 'PLUS' });
        }}
      ></input>
    </div>
  );
}