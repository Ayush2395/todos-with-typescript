const authMiddleware = require("../middleware/authMiddleware");
const Todos = require("../models/todos.model");

const todosRoutes = require("express").Router();

todosRoutes.use(authMiddleware);

todosRoutes.get("/", async (req, res) => {
  const userId = req.user.userId;
  try {
    const todo = await Todos.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
todosRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todos.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
todosRoutes.post("/", async (req, res) => {
  const { task, status } = req.body;

  try {
    const userId = req.user.userId;
    const todo = await Todos.create({ task, status, userId });
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
todosRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todos.findByIdAndDelete(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
todosRoutes.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todos.findByIdAndUpdate(id, { ...req.body });
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = todosRoutes;
