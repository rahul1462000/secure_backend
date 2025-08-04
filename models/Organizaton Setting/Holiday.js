const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // e.g. "Independence Day"
  },
  date: {
    type: Date,
    required: true, // Holiday date
  },
  description: {
    type: String, // Optional description
  },
}, { timestamps: true });

module.exports = mongoose.model("Holiday", holidaySchema);
