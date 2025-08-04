const express = require('express');
const router = express.Router();
const AboutJob = require('../../models/IntroduceYourself/AboutJob');

// Create SubmitWeek
router.post('/post-aboutjob', async (req, res) => {
  try {
    const aboutjob = new AboutJob(req.body);
    await aboutjob.save();
    res.status(201).json({ message: 'Save Response', aboutjob });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
