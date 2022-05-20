import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경함
const INSERT = 'todos/INSERT'; // 새로운 todo 를 등록함
const TOGGLE = 'todos/TOGGLE'; // todo 를 체크/체크해제 함
const REMOVE = 'todos/REMOVE'; // todo 를 제거함

const testAction = createAction("TEST", test => test);
const hello = testAction("hello");
console.log("hello====", hello); //{type: 'TEST', payload: 'hello'}

export const changeInput = createAction(CHANGE_INPUT, input => input);

// 액션 생성 함수에서 받아 온 파라미터를 그대로 payload에 넣는 것이 아니라 변형을 주어서 넣고 싶다면
// 두번째 함수에 payload를 정의하는 함수 따로 선언
let id = 3; // insert 가 호출 될 때마다 1씩 더해집니다.
export const insert = createAction(INSERT, text => ({
  id: id++,
  text,
  done: false,
}));

export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false,
    },
  ],
};

const todos = handleActions(
  // createAction으로 액션을 만들면 액션에 필요한 추가 데이터는 payload라는 이름을 사용한다.
  // 액션 생성 함수는 액션에 필요한 추가 데이터를 모두 payload라는 이름으로 사용하기 때문에
  // action.id, action.todo를 조회하는 대신 모두 공통적으로 action.payload 값을 조회하도록 리듀서를 구현해주어야 한다.
  {
    //객체 구조 분해 문법으로 action 값의 payload 이름을 새로 설정해주면 action.payload가 정확히 어떤 값을 의미하는 지 쉽게 파악
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, draft => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, draft => {
        draft.todos.push(todo);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, draft => {
        const todo = draft.todos.find(todo => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, draft => {
        const index = draft.todos.findIndex(todo => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState,
);

export default todos;
