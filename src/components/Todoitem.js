import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import todoContext from "../context/todoContext";

const Todoitem = (props) => {
  const context = useContext(todoContext);
  const { deleteTodo } = context;
  const { todo, updateTodo } = props;

  return (
    <div className="card">
      <div className="todo-card-body">
        <h5 className="todo-card-title">{todo.title}</h5>
        <p className="todo-card-text">{todo.tag}</p>
        <div className="todo-buttons">
          <FontAwesomeIcon className="icon mx-2" icon={faTrash} onClick={() => {deleteTodo(todo._id);}}/>
          <FontAwesomeIcon className="icon" icon={faEdit} onClick={() => updateTodo(todo)} />
        </div>
      </div>
    </div>
  );
};

export default Todoitem;
