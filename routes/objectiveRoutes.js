const express = require('express');
const router = express.Router();
const Objective = require('../models/Objective');

// Create Objective
router.post('/create-objective', async (req, res) => {
  try {
    const objective = new Objective(req.body);
    await objective.save();
    res.status(201).json({ message: 'Objective created successfully', objective });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
