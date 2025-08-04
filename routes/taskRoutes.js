const express = require('express');
const Task = require('../models/task');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

// Create SubmitWeek
// router.post('/create-task', async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     res.status(201).json({ message: 'Task Submitted successfully', task });
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// });

const User = require('../models/User');

// Create Task (Assign to User)
router.post('/create-task', async (req, res) => {
  try {
    const { title, assignedToName, priority } = req.body;

    // Find user by name
    const user = await User.findOne({ name: assignedToName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const task = new Task({
      title,
      assignedTo: user._id, // Store userId
      priority
    });

    await task.save();
    res.status(201).json({ message: 'Task assigned successfully', task });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

router.get('/my-tasks/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

router.get('/all-task', verifyToken, isAdmin, async (req, res) => {
  try {
    // Exclude admins if needed: { role: 'user' }
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// ✅ Get Task by ID
router.get('/get-task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});


// ✅ Update Task by ID
router.put('/update-task/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // return updated task
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Delete Task by ID
router.delete('/delete-task/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




module.exports = router;
