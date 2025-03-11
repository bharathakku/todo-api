const todos = [];
let currentId = 1;

// Create a new to-do item
exports.createTodo = (req, res) => {
    const { title, completed = false } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTodo = { id: currentId++, title, completed };
    todos.push(newTodo);
    res.status(201).json(newTodo);
};

// Get all to-do items
exports.getAllTodos = (req, res) => {
    res.json(todos);
};

// Get a single to-do item by ID
exports.getTodoById = (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: 'To-do item not found' });
    }
    res.json(todo);
};

// Update   item
exports.updateTodoById = (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: 'To-do item not found' });
    }
    const { title, completed } = req.body;
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    res.json(todo);
};

// Delete   item
exports.deleteTodoById = (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'To-do item not found' });
    }
    todos.splice(index, 1);
    res.status(204).send();
};

exports.partialUpdateTodo = (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: "To-Do not found" });

    const { title, completed } = req.body;

    if (title !== undefined) {
        todo.title = title;
    }
    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json(todo);
};
