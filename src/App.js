import "./App.css";
import React, { useState } from "react";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup"

function App() {
  const myStyle = {
    width: "600px",
    height: "auto",
    backgroundColor: "#040436",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div style={myStyle} className="container my-3">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/About" element={<About showAlert={showAlert} />} />
            <Route
              exact
              path="/Login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/Signup"
              element={<Signup showAlert={showAlert} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
