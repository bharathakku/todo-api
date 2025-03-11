const express = require('express');
const app = express();

app.use(express.json()); // This is required for PATCH to work

const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
