// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0), // Store only date (no time)
    required: true
  },
  checkIn: {
    type: String, // Store as HH:mm format
    required: false
  },
  checkOut: {
    type: String, // Store as HH:mm format
    required: false
  }
}, { timestamps: true });

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
