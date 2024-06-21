const express = require('express')
const { createTodo,fetchTodos,updateTodo } = require("../Controllers/todoController")
const fetchUser = require("../Middleware/fetchUser")

const router = express.Router()

router.post('/createtodo',fetchUser,createTodo)
router.get('/fetchtodos/:id',fetchUser,fetchTodos)
router.put('/updatetodo/:id',fetchUser,updateTodo)

module.exports = router;