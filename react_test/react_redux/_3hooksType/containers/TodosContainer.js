import React, {useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';
//mport useActions from '../lib/useActions';

const TodosContainer = () => {

  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos
  }));

  const dispatch = useDispatch();

  const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
  const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);
  
  // const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
  //   [changeInput, insert, toggle, remove],
  //   []
  // );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default React.memo(TodosContainer);
// connect 함수를 사용하여 컨테이너 컴포넌트를 만들었을 경우, 해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 해당 컨테이너의 props가
// 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성능이 최적화된다.

// 반면 useSelector를 사용하여 리덕스 상태를 조회했을 때는 이 최적화 작업이 자동으로 이루어지지 않으므로, 성능 최적화를 위해서는
// React.memo를 컨테이너 컴포넌트에 사용해 주어야 한다.
