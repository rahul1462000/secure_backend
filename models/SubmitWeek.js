const mongoose = require('mongoose');

const SubmitWeekSchema = new mongoose.Schema({
  reason: { type: String, required: true }
});

module.exports = mongoose.model('SubmitWeek', SubmitWeekSchema);
