const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  employeeName: { type: String, required: true },
  month: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  hra: { type: Number, default: 0 },
  conveyance: { type: Number, default: 0 },
  medicalAllowance: { type: Number, default: 0 },
  otherAllowances: { type: Number, default: 0 },
  bonus: { type: Number, default: 0 },
  pfDeduction: { type: Number, default: 0 },
  taxDeduction: { type: Number, default: 0 },
  otherDeductions: { type: Number, default: 0 },
  grossSalary: { type: Number, required: true },
  totalDeductions: { type: Number, required: true },
  netSalary: { type: Number, required: true },
  status: { type: String, default: "Pending" }
}, { timestamps: true });
payrollSchema.index({ employeeId: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("Payroll", payrollSchema);
