import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeInput as changeInputAction,
  insert as insertAction,
  toggle as toggleAction,
  remove as removeAction,
} from "../modules/todos";
import Todos from "../components/Todos";
//import useActions from '../lib/useActions';

// dispatch({type:'SELECT', id:"11111"})
// reducer(state, action) => {
//   if(action.type === "SELECT"){
//     newState = action.id; //11111
//   } else if(action.type === "CREATE"){
//   }
// }

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  const dispatch = useDispatch();

  const onChangeInputDispath = useCallback(
    (input) => dispatch(changeInputAction(input)),
    [dispatch]
  );
  const onInsertDispath = useCallback(
    (text) => dispatch(insertAction(text)),
    [dispatch]
  );
  const onToggleDispath = useCallback(
    (id) => dispatch(toggleAction(id)),
    [dispatch]
  );
  const onRemoveDispath = useCallback(
    (id) => dispatch(removeAction(id)),
    [dispatch]
  );

  // const onChangeInput = useCallback(
  //   function (input) {
  //     console.log("onChangeInput >>>> input=====", input);
  //     console.log(
  //       "onChangeInput >>>> changeInputAction=====",
  //       changeInputAction(input) //{type: 'todos/CHANGE_INPUT', payload: input value 값}
  //     );
  //     return dispatch(changeInputAction(input)); //input: onchange할 때마다 input value 값
  //   },
  //   [dispatch]
  // );
  // const onInsert = useCallback(
  //   function (value) {
  //     console.log("onInsert >>>> value=====", value);
  //     return dispatch(insertAction(value)); //text: input value 값
  //   },
  //   [dispatch]
  // );
  // const onToggle = useCallback(
  //   function (id) {
  //     console.log("onToggle >>>> id=====", id);
  //     return dispatch(toggleAction(id));
  //   },
  //   [dispatch]
  // );
  // const onRemove = useCallback(
  //   function (id) {
  //     console.log("onRemove >>>> id=====", id);
  //     return dispatch(removeAction(id));
  //   },
  //   [dispatch]
  // );

  // const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
  //   [changeInput, insert, toggle, remove],
  //   []
  // );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInputDispath={onChangeInputDispath}
      onInsertDispath={onInsertDispath}
      onToggleDispath={onToggleDispath}
      onRemoveDispath={onRemoveDispath}
    />
  );
};

export default React.memo(TodosContainer);
// connect 함수를 사용하여 컨테이너 컴포넌트를 만들었을 경우, 해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 해당 컨테이너의 props가
// 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성능이 최적화된다.

// 반면 useSelector를 사용하여 리덕스 상태를 조회했을 때는 이 최적화 작업이 자동으로 이루어지지 않으므로, 성능 최적화를 위해서는
// React.memo를 컨테이너 컴포넌트에 사용해 주어야 한다.
