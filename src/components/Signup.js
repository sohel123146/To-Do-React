import React, { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
    console.log(credentials);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with credentials:", credentials);
    setCredentials({ email: "", password: "" });
  };

  return (
    <div style={{ color: "#ffffff", padding: "25px" }} className="container">
      <h2>Please Signup to Continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            value={credentials.name}
            autoComplete="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credentials.email}
            autoComplete="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
