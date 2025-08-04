const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  shiftName: { type: String, required: true }, // Morning, Evening, Night
  startTime: { type: String, required: true }, // HH:mm format
  endTime: { type: String, required: true },   // HH:mm format
}, { timestamps: true });

module.exports = mongoose.model("Shift", shiftSchema);
