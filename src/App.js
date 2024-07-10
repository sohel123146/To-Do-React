import "./App.css";
import React,{useState} from "react";
import Addtodo from "./components/Addtodo";
import Alert from "./components/Alert";

function App() {
  const myStyle = {
    width:'600px',
    height:'auto',
    backgroundColor:'#040436',
    borderRadius:'10px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  }

  const [alert,setAlert] = useState(null)
  
  const showAlert = (message,type) =>
  {
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }


  return (
    <>
      <Alert alert={alert}/>
      <div style={myStyle} className="container my-3">
      <Addtodo showAlert={showAlert}/>
      </div>
    </>
  );
}

export default App;