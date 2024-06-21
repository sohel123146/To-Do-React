import React from "react";
import Addtodo from "./Addtodo";

const Home = ({showAlert}) => {
  return (
    <div className="container">
      <Addtodo showAlert={showAlert} />
    </div>
  );
};

export default Home;
