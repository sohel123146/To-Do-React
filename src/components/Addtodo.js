import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'

function Addtodo({ todolist, deleteItem, editItem }) {
  return (
    <div>
      {todolist.map((todo, index) => {
        return (
          <div className="d-flex align-items-center justify-content-center">
            <div key={index} style={{ color: "white" }} className="todo-items d-flex ">
              <h4>{todo}</h4>
              <div className="buttons d-flex">
                <FontAwesomeIcon className='icon mx-3' icon={faTrash} onClick={()=>{deleteItem(index)}}/>
                <FontAwesomeIcon className='icon mx-3' icon={faEdit} onClick={()=>{editItem(index)}}/>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Addtodo;
