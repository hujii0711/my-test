import React from "react";

const TodoItem = ({ todo, onToggleDispath, onRemoveDispath }) => {
  const onToggleDispath_ = () => onToggleDispath(todo.id);
  const onRemoveDispath_ = () => onRemoveDispath(todo.id);
  return (
    <div>
      <input
        type="checkbox"
        onClick={onToggleDispath_}
        checked={todo.done}
        readOnly={true}
      />
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.text}
      </span>
      <button onClick={onRemoveDispath_}>삭제</button>
    </div>
  );
};
export default TodoItem;
