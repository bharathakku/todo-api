const validateTodo = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
      return res.status(400).json({ error: 'Title is required' });
  }
  next();
};

module.exports = validateTodo;
