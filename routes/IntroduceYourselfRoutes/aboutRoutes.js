const express = require('express');
const router = express.Router();
const About = require('../../models/IntroduceYourself/About');

// Create SubmitWeek
router.post('/post-about', async (req, res) => {
  try {
    const about = new About(req.body);
    await about.save();
    res.status(201).json({ message: 'Save Response', about });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
