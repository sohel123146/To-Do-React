/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import Addtodo from "./Addtodo";
import Todoitem from "./Todoitem";
import todoContext from "../context/todoContext";
import { useNavigate } from "react-router-dom";

const Todos = (props) => {
  const context = useContext(todoContext);
  const { todos, getTodos, editTodo } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodos();
    } else {
      navigate("/login");
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [todo, setTodo] = useState({
    id: "",
    etitle: "",
    etag: "",
  });

  const updateTodo = (currentTodo) => {
    ref.current.click();
    setTodo({
      id: currentTodo._id,
      etitle: currentTodo.title,
      etag: currentTodo.tag,
    });
  };

  const handleClick = (e) => {
    editTodo(todo.id, todo.etitle, todo.edescription, todo.etag);
    refClose.current.click();
    props.showAlert("todos Updated Successfully", "success");
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addtodo showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={todo.etitle}
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
                    id="etag"
                    name="etag"
                    value={todo.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={todo.etitle.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update todo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2 className="text">You todos</h2>
        <div className="container mx-2">
          {todos.length === 0 && "No todos to display"}
        </div>
        {todos.map((todo) => {
          return (
            <Todoitem
              key={todo._id}
              updateTodo={updateTodo}
              showAlert={props.showAlert}
              todo={todo}
            />
          );
        })}
      </div>
    </>
  );
};

export default Todos;
