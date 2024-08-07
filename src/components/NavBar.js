import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h2 style={{ color: "#fff" }} className="inotes">
          TO-DO
        </h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                To-Do
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <NavLink
                className="btn btn-primary mx-1"
                to="/login"
                role="button"
              >
                Login
              </NavLink>
              <NavLink
                className="btn btn-primary mx-1"
                to="/signup"
                role="button"
              >
                Signup
              </NavLink>
            </form>
          ) : (
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
