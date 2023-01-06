const authProtection = require("../middleware/authMiddleware");
const todos = require("../model/todo.model");

const todoRoutes = require("express").Router();

todoRoutes.use(authProtection);

todoRoutes.get("/", async (req, res) => {
  const userId = req.user.id;
  try {
    const todo = await todos.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

todoRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todos.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

todoRoutes.post("/", async (req, res) => {
  const { task, status } = req.body;
  const userId = req.user.id;
  try {
    const todo = await todos.create({ task: task, status: status, userId });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

todoRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todos.findByIdAndDelete(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

todoRoutes.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todos.findByIdAndUpdate(id, { ...req.body });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = todoRoutes;
