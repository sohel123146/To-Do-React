import React, { useState } from 'react'
import TodoContext from "./todoContext"

const TodoState = (props) => {
    const host = "http://localhost:5000";
    const todosInitial = []
    const [todos,setTodos] = useState(todosInitial)

    const getTodos = async()=>{
        const response = await fetch(`${host}/api/todos/fetchalltodos`,{
            method: 'GET',
            headers:{
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setTodos(json)
    }


    const addTodo = async(title, tag)=>{
        const response = await fetch(`${host}/api/todos/addtodo`,{
            method: "POST",
            headers:{
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body:JSON.stringify({title,tag})
        });

        const todo = await response.json()
        setTodos(todos.concat(todo))
    }

    const deleteTodo = async(id)=>{
        const response = await fetch(`${host}/api/todos/deletetodo/${id}`,{
            method:"DELETE",
            headers:{
                'Content-type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const json = response.json()
        console.log(json)
        const newTodos = todos.filter((todo)=> { return todo._id !== id })
        setTodos(newTodos)
    }

    const editTodo = async(id, title, tag) =>{
        const response = await fetch(`${host}/api/todos/updatetodo/${id}`,{
            method:"PUT",
            headers:{
                'Content-type':'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body:JSON.stringify({title, tag})
        });
        const json = await response.json()
        console.log(json)
        //logic to update todo on client side
        const updatedTodos = todos.map(todo =>
            todo._id === id ? { ...todo, title,tag } : todo
          );
        setTodos(updatedTodos)
    }

    return(
        <TodoContext.Provider value={{ todos, getTodos, addTodo, deleteTodo, editTodo }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export default TodoState