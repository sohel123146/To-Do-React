import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


const Signup = ({showAlert}) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [password,setPassword] = useState(true)

  let navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken); 
        navigate('/')
        showAlert("Account created successfully","success")

    }
    else{
        showAlert("Invalid credentials","danger");
    }
}

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = () =>{
    setPassword(!password)
  }

  return (
<div className="form-wrapper">
  <div style={{ color: "#000", padding: "25px" }} className="form-container">
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
          type={password ? 'password' : 'text'}
          className="password-container form-control"
          id="password"
          name="password"
          onChange={onChange}
          value={credentials.password}
          autoComplete="current-password"
        />
        {password ? <EyeOff className="lucideIcon" onClick={handleClick}/> : <Eye className="lucideIcon" onClick={handleClick}/>}
        </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</div>

  );
};

export default Signup;
