const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  assignee: { type: String, default: '' }, // optional user name or id
  dueDate: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
