const mongoose = require("mongoose");

const PayslipSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Employee User ID
  month: { type: String, required: true },  // Example: "July"
  year: { type: String, required: true },   // Example: "2025"
  employee: {
    name: { type: String, required: true },
    empId: { type: String, required: true },
    designation: { type: String },
    department: { type: String }
  },
  earnings: [
    {
      type: { type: String },
      amount: { type: Number }
    }
  ],
  deductions: [
    {
      type: { type: String },
      amount: { type: Number }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Payslip", PayslipSchema);
