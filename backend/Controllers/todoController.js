const todoModel = require("../Models/todoMOdel")
const { validationResult } = require("express-validator");


const createTodo = async(req,res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(400).json({ errors: result.array() });
        }

        const { title,tag } = req.body;

        const todos = new todoModel({
            title,
            tag,
            user: req.user.id,
        })
        const savedTodos = await todos.save()
        res.status(200).json(savedTodos)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}


const fetchTodos = async(req,res) => {
    const { userId } = req.params;
    try {
        const todos = await todoModel.find({ user: userId })
        res.json(todos)
    } catch (error) {
        console.error(error.message)
        res.status(400).send("Internal Server Error...")
    }
}

const updateTodo = async(req,res) =>{
    const { title,tag } = req.body
    try {
        const newTodo = {}
        if(title){
            newTodo.title = title
        }

        if(tag){
            newTodo.tag = tag
        }

        // Find the note to be updated and update it
        let todo = await todoModel.findById(req.params.id)  //"req.params.id" this id is coming from '/updateTodo/:id
        if(!todo){
            return res.status(400).send("Not Found")
        }

        //allow user to update if he owns the todo "This code block not allowing user to update the todo"
        //todo.user.toString gives id of the todo
        if(todo.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        //if the note exists then update the todo
        todo = await todoModel.findByIdAndUpdate(
            req.params.id,
            { $set: newTodo },
            { new: true }
        );
        res.status(200).json(todo)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { createTodo,fetchTodos,updateTodo }