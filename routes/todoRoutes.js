const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const validateTodo = require("../middlewares/validateTodo");

router.post("/", validateTodo, todoController.createTodo); 
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodoById);
router.delete("/:id", todoController.deleteTodoById);
router.patch("/:id", todoController.partialUpdateTodo);

module.exports = router;
