import React, { useState } from "react";
import Todoitem from "./Todoitem";

function Addtodo(props) {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    if (task.trim().length > 0) {
      setTodo([...todo, task]);
      setTask("");
      props.showAlert("New Todo Added", "success");
    }
  };

  const onChange = (e) => {
    setTask(e.target.value);
  };

  const deleteItem = (index) => {
    const newTodo = todo.filter((_todo, currentIndex) => {
      return currentIndex !== index;
    });
    setTodo(newTodo);
    props.showAlert("Todo Deleted", "danger");
  };

  const editItem = (index) => {
    const editedTodo = prompt("Edit todo", todo[index]);

    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...todo];
      updatedTodos[index] = editedTodo;
      setTodo(updatedTodos); 
      props.showAlert("Todo Updated", "success");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center my-3">
        <h1 style={{ color: "white", marginTop: "10px" }}>Get Things Done!!</h1>
      </div>
      <div className="d-flex align-items-center justify-content-center my-3">
        <form onSubmit={handleClick} className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Add Item..."
            onChange={onChange}
            value={task}
          />
          <button
            type="submit"
            disabled={task.length === 0}
            className="btn btn-primary"
          >
            Add
          </button>
        </form>
      </div>
      <div className="d-flex align-items-center justify-content-center my-3">
        <ul className="list-group">
          {todo.map((item, index) => (
            <Todoitem
              key={index}
              index={index}
              task={item}
              deleteItem={deleteItem}
              editItem={editItem}
              showAlert={props.showAlert}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Addtodo;
