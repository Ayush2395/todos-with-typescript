const todos = require("../model/todo.model");

const todoRoutes = require("express").Router();

todoRoutes.get("/", async (req, res) => {
  try {
    const todo = await todos.find();
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
  try {
    const todo = await todos.create({ task: task, status: status });
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
