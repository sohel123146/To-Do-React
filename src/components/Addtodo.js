import React, { useState } from "react";
import Todoitem from "./Todoitem";
import 'bootstrap/dist/css/bootstrap.min.css';
import Confirmdelete from "./Confirmdelete";
import Confirmedit from "./Confirmedit";

function Addtodo(props) {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editindex, setEditindex] = useState(null)

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

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    const modal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  };

  const deleteItem = () => {
    if (deleteIndex !== null) {
      const newTodo = todo.filter((_todo, currentIndex) => currentIndex !== deleteIndex);
      setTodo(newTodo)
      props.showAlert("Todo Deleted", "danger");
      setDeleteIndex(null);
    }
  };

  const confrimEdit = (index) => {
    setEditindex(index)
    setTask(todo[index]);
    const modal = new window.bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  }

  const editItem = (index) => {
    if (task.trim() !== "") {
      let updatedTodos = [...todo];
      updatedTodos[editindex] = task;
      setTodo(updatedTodos);
      props.showAlert("Todo Updated", "success");
      setEditindex(null)
      setTask('') 
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
              deleteItem={() => confirmDelete(index)}
              editItem={() => confrimEdit(index)}
              showAlert={props.showAlert}
            />
          ))}
        </ul>
      </div>
      <div>
        <Confirmdelete deleteItem={deleteItem}/>
      </div>
      <div>
        <Confirmedit editItem={editItem} onChange={onChange} task={task}/>
      </div>
    </>
  );
}

export default Addtodo;