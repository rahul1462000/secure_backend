const mongoose = require('mongoose');

const ObjectiveSchema = new mongoose.Schema({
  objectiveTitle: { type: String, required: true },
  description: { type: String },
  metricType: { type: String, required: true },
  targetFrom: { type: Number, required: true },
  targetTo: { type: Number, required: true },
  metricName: { type: String },
  objectiveType: { type: String, enum: ['Individual', 'Team'], required: true },
  timeFrame: { type: String, required: true }, // Example: '2025'
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  includeInReview: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Objective', ObjectiveSchema);
