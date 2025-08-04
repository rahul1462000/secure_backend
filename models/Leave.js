// const mongoose = require('mongoose');

// const LeaveSchema = new mongoose.Schema({
//   fromDate: { type: Date, required: true },
//   toDate: { type: Date, required: true },
//   leaveType: { type: String, required: true }, // eg: Sick, Casual, Paid Leave
//   note: { type: String },
//   notifyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Employee to notify
//   appliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   status: { type: String, default: 'Pending' }, // Pending / Approved / Rejected
//   appliedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Leave', LeaveSchema);
// const mongoose = require('mongoose');

// const leaveSchema = new mongoose.Schema({
//   fromDate: { type: Date, required: true },
//   toDate: { type: Date, required: true },
//   leaveType: { type: String, required: true },
//   note: { type: String },
//   notifyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin
//   appliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // employee
//   status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
//   decisionBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin who took action
//   remarks: { type: String }
// });

// module.exports = mongoose.model('Leave', leaveSchema);

const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  leaveType: { type: String, required: true }, // eg: Sick, Casual, Paid Leave
  note: { type: String },
  notifyTo: { type: String }, // Employee to notify
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});

module.exports = mongoose.model('Leave', LeaveSchema);