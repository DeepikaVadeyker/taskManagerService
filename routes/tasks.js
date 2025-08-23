const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /api/tasks - all tasks (optional ?status=all|active|completed)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status === 'active') filter.completed = false;
    else if (status === 'completed') filter.completed = true;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message+'Server error' });
  }
});

// POST /api/tasks - create new task
router.post('/', async (req, res) => {
  try {
    const { title, description, assignee, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = new Task({ title, description, assignee, dueDate });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message+'Server error' });
  }
});

// PUT /api/tasks/:id - update task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message+'Server error' });
  }
});

// DELETE /api/tasks/:id - delete task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Task.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Deleted', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message+'Server error' });
  }
});

module.exports = router;
