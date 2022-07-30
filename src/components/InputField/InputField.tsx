import React, { FormEvent } from "react";
import styles from "./InputField.module.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
    <form className={styles.form} onSubmit={handleAdd}>
      <input
        className={styles.input}
        type="text"
        name="todo"
        id="todo"
        placeholder="enter todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className={styles.button} type="submit">
        +
      </button>
    </form>
  );
};

export default InputField;
