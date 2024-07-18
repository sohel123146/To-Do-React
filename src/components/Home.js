import React from 'react'
import Todos from "./Todos"

const Home = ({showAlert}) => {
  return (
    <div>
      {
        !localStorage.getItem('token') ? <p>Please login</p> : <Todos showAlert={showAlert}/>
      }
    </div>
  )
}

export default Home
