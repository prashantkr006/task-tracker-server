const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const taskSchema = new mongoose.Schema({
    taskID: { type: Number, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    subtasks: [subtaskSchema],
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
