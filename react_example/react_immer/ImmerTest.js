import produce from 'immer';

const orgData = [
    {
      id: 1,
      todo: 'todo1',
      checked: true,
    },
    {
      id: 2,
      todo: 'todo2',
      checked: true,
    },
];

// orgData: 수정하고 싶은 상태
// (draft) => {}: 상태를 어떻게 업데이트 할지 정의 하는 함수
// 두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, produce 함수가 불변성 유지를 대신 해주면서 새로운 상태를 생성해준다.
// immer 라이브러리의 핵심은 '불변성에 신경 쓰지 않는 것처럼 코드를 작성하되 불변성 관리를 제대로 해주는 것'이다.
const nextState = produce(orgData, (draft) => {
 
  const todos = draft.find((data) => data.id === 2);
  console.log('todos=====', todos);

  todos.todo = "새로운 todo1 값 변경!!!!";

  draft.push({
    id: 3,
    todo: '새로운 todo3 값 추가!!!!',
    checked: true,
  });
});
console.log('nextState=====', nextState);

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  login: {
    username: '',
    password: ''
  },
  auth: null,
  authError: null
};

const nextInitialState = produce(initialState, (draft) => {
    draft["register"]["username"] = "김형준";
});
console.log('nextInitialState=====', nextInitialState);

const nextInitialState1 = ({
  ...initialState,
  authError: "YES"
});
console.log('nextInitialState1=====', nextInitialState1);

const action = { type : 'LIST_POSTS_SUCCESS', payload : "test" };
const nextInitialState2 = ({
  ...initialState,
  authError: action.payload
});

console.log('nextInitialState2=====', nextInitialState2);

const ImmerTest = () => {
  return (
    <div>
    </div>
  );
};

export default ImmerTest;