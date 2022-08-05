import React, { useRef } from "react";
import TodoItem from "./TodoItem";

const Todos = ({
  input,
  todos,
  onChangeInputDispath,
  onInsertDispath,
  onToggleDispath,
  onRemoveDispath,
}) => {
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    onInsertDispath(input);
    onChangeInputDispath(""); // 등록 후 인풋 초기화
    inputRef.current.focus();
  };

  const onChange = (e) => onChangeInputDispath(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} value={input} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        {todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              onToggleDispath={onToggleDispath}
              onRemoveDispath={onRemoveDispath}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todos;
