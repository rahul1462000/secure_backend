const express = require('express');
const router = express.Router();
const SubmitWeek = require('../models/SubmitWeek');

// Create SubmitWeek
router.post('/create-submitweek', async (req, res) => {
  try {
    const submitweek = new SubmitWeek(req.body);
    await submitweek.save();
    res.status(201).json({ message: 'Submitted successfully', submitweek });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
