const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/', todoController.createTodo);
router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodoById);
router.delete('/:id', todoController.deleteTodoById);

router.patch('/:id', todoController.partialUpdateTodo);

module.exports = router;
