import "./App.css";
import React, { useState } from "react";
import Addtodo from "./components/Addtodo";

function App() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setTodo([...todo, task]);
    setTask("");
  };

  const onChange = (e) => {
    setTask(e.target.value);
  };

  const deleteItem = (index) => {
    const newTodo = todo.filter((_todo, currentIndex) => {
      return currentIndex !== index;
    });
    setTodo(newTodo);
  };

  const editItem = (index) => {
    const editedTodo = prompt('Edit todo',todo[index])

    if(editedTodo !== null && editedTodo.trim() !== ''){
      let updatedTodos = [...todo] 
      updatedTodos[index].value = editedTodo
      setTodo(editedTodo)
    }
  }

  return (
    <div className="container my-3">
      <div className="d-flex align-items-center justify-content-center">
        <h1 style={{ color: "white" }}>This is your TO-DO app</h1>
      </div>
      <div className="d-flex align-items-center justify-content-center my-3">
        <input
          type="text"
          className="form-group"
          placeholder="Add Item..."
          onChange={onChange}
          value={task}
        ></input>
        <button disabled={task.length===0} className="btn btn-primary" onClick={handleClick}>
          Add
        </button>
      </div>
      <Addtodo todolist={todo} deleteItem={deleteItem} editItem={editItem}/>
    </div>
  );
}

export default App;
