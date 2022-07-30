import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Todo } from "../../model/Models";
import styles from "./TodoItem.module.css";

interface Props {
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoItem: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [currTodo, setCurrTodo] = useState<string>(todo.todo);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEdit = () => {
    if (!editMode && !todo.isDone) {
      setEditMode(!editMode);
    }
  };

  const handleDelete = () => {
    const newTodos = todos.filter((currentTodo) => currentTodo.id !== todo.id);
    setTodos(newTodos);
  };

  const handleDone = () => {
    const newTodos = todos.map((currentTodo) =>
      currentTodo.id === todo.id
        ? { ...currentTodo, isDone: !currentTodo.isDone }
        : currentTodo
    );
    setTodos(newTodos);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodos = todos.map((currentTodo) =>
      currentTodo.id === todo.id
        ? { ...currentTodo, todo: currTodo }
        : currentTodo
    );
    setTodos(newTodos);
    setEditMode(false);
  };

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [editMode]);

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`${styles.todo} ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleSubmit(e)}
        >
          {todo && todo.isDone ? (
            <span
              className={styles.todoTitle}
              style={{ textDecoration: "line-through" }}
            >
              {todo.todo}
            </span>
          ) : editMode ? (
            <input
              type="text"
              value={currTodo}
              onChange={(e) => setCurrTodo(e.target.value)}
              ref={ref}
            />
          ) : (
            <span className={styles.todoTitle}>{todo.todo}</span>
          )}
          <div className={styles.iconContainer}>
            <span onClick={handleEdit}>edit</span>
            <span onClick={handleDelete}>delete</span>
            <span onClick={handleDone}>done</span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;
