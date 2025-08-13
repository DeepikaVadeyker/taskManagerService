const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../models/TaskDynamo');

router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const tasks = await getTasks(status);
    res.json(tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, assignee, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTask = await createTask({ title, description, assignee, dueDate });
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await updateTask(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
