import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NavBar from './components/NavBar';
import TodoHome from './components/TodoHome';
import Home from './components/Home';
import About from './components/About';
import TodoState from './context/TodoState'; 
import Alert from './components/Alert';
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import './App.css';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const location = useLocation();

  return (
    <TodoState>
      <NavBar />
      <Alert alert={alert} />
      <div className="container">
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes location={location}>
              <Route exact path="/" element={<TodoHome/>} />
              <Route exact path="/home" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </TodoState>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WrappedApp;