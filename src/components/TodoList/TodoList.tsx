import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../model/Models";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  completedTodos: Array<Todo>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className={styles.container}>
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.todosActive} ${
              snapshot.isDraggingOver ? styles.dragActive : ""
            }`}
          >
            <h1 className={styles.title}>Active todos</h1>
            {todos &&
              todos.map((todo, index) => {
                return (
                  <TodoItem
                    index={index}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                    key={todo.id}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.todosComplete} ${
              snapshot.isDraggingOver ? styles.dragActive : ""
            }`}
          >
            <h1 className={styles.title}>Completed todos</h1>
            {completedTodos &&
              completedTodos.map((todo, index) => {
                return (
                  <TodoItem
                    index={index}
                    todo={todo}
                    todos={completedTodos}
                    setTodos={setCompletedTodos}
                    key={todo.id}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
