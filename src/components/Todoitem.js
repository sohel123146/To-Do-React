import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Todoitem = ({ task,index,deleteItem,editItem}) => {

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div style={{ color: "white" }} className="todo-items d-flex ">
        <h4>{task}</h4>
        <div className="buttons d-flex">
          <FontAwesomeIcon
            className="icon mx-2"
            icon={faTrash}
            onClick={()=> deleteItem(index) }
          />
          <FontAwesomeIcon className="icon" icon={faEdit} onClick={()=> editItem(index) } />
        </div>
      </div>
    </div>
  );
};

export default Todoitem;