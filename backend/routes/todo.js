const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Todo = require("../models/Todo");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Todos using: GET "/api/todos/getuser". Login required
router.get("/fetchalltodos", fetchuser, async (req, res) => {
    try {
        // console.log('User ID:', req.user.id); // Debugging output
        const todos = await Todo.find({ user: req.user.id });
        // console.log('Todos:', todos); // Debugging output
        res.json(todos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Todo using: POST "/api/todos/addtodo". Login required
router.post(
  "/addtodo",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("tag", "Tag must be atleast 3 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, tag } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const todo = new Todo({
        title,
        tag,
        user: req.user.id,
      });
      const savedTodo = await todo.save();
      res.json(savedTodo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Todo using: PUT "/api/todos/updatetodo". Login required
router.put("/updatetodo/:id", fetchuser, async (req, res) => {
  const { title, tag } = req.body;
  try {
    // Create a newTodo object
    const newTodo = {};
    if (title) {
        newTodo.title = title;
    }
    if (tag) {
        newTodo.tag = tag;
    }

    // Find the todo to be updated and update it
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not Found");
    }

    if (todo.user && todo.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: newTodo },
      { new: true }
    );
    res.json({ todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Todo using: DELETE "/api/todos/deletetodo". Login required
router.delete("/deletetodo/:id", fetchuser, async (req, res) => {
  try {
    // Find the todo to be delete and delete it
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Todo
    if (todo.user && todo.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    todo = await Todo.findByIdAndDelete(req.params.id);
    res.json({ Success: "Todo has been deleted", todo: todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;