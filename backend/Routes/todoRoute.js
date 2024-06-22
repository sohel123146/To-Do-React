const express = require('express')
const { createTodo,fetchTodos,updateTodo,deleteTodo } = require("../Controllers/todoController")
const fetchUser = require("../Middleware/fetchUser")

const router = express.Router()

router.post('/createtodo',fetchUser,createTodo)
router.get('/fetchtodos',fetchUser,fetchTodos)
router.put('/updatetodo/:id',fetchUser,updateTodo)
router.delete('/deletetodo/:id',fetchUser,deleteTodo)

module.exports = router;