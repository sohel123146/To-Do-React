import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import todoContext from "../context/todoContext";

function Addtodo(props) {
  const context = useContext(todoContext);
  const { addTodo } = context;
  const [todo, setTodo] = useState({ title: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addTodo(todo.title, todo.description, todo.tag);
    props.showAlert("todo Added Successfully", "success");
    setTodo({ title: "", tag: "" });
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-3">
        <h2>Add a todo</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={todo.title}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={todo.tag}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <button
            disabled={todo.title.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
}

export default Addtodo;
