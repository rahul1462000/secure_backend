const express = require('express');
const router = express.Router();
const Github = require('../../models/IntroduceYourself/Github');

// Create SubmitWeek
router.post('/post-github', async (req, res) => {
  try {
    const github = new Github(req.body);
    await github.save();
    res.status(201).json({ message: 'Save Response', github });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
