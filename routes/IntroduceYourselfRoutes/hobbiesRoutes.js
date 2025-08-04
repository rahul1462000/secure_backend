const express = require('express');
const router = express.Router();
const Hobbies = require('../../models/IntroduceYourself/Hobbies');

// Create SubmitWeek
router.post('/post-hobbies', async (req, res) => {
  try {
    const hobbies = new Hobbies(req.body);
    await hobbies.save();
    res.status(201).json({ message: 'Save Response', hobbies });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
