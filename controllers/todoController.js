const mongoose = require("mongoose");
const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
    try {
        console.log("Received request:", req.body); // Debug log
        const { title, completed = false } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const newTodo = new Todo({ title, completed });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: "Failed to create todo" });
    }
};

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid todo ID format" });
        }

        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: "To-do item not found" });
        }

        res.json(todo);
    } catch (error) {
        console.error("Error fetching todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.updateTodoById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid todo ID format" });
        }

        const { title, completed } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, completed },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update todo", details: error.message });
    }
};


exports.deleteTodoById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid todo ID format" });
        }

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: "To-do item not found" });
        }

        res.status(200).json({ message: "To-do item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
};



exports.partialUpdateTodo = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid todo ID format" });
        }

        const { title, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { $set: { title, completed } },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "To-Do not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: "Failed to update todo" });
    }
};

