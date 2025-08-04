const mongoose = require('mongoose');

const AboutJobSchema = new mongoose.Schema({
  aboutjob: { type: String, required: true }
});

module.exports = mongoose.model('AboutJob', AboutJobSchema);
