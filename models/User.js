// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   // role: { type: String, enum: ['User', 'admin',''], default: '' },
//     role: { 
//     type: String, 
//     enum: ['Frontend', 'Backend', 'Fullstack', 'admin'], 
//     required: true 
//   },
//   failedAttempts: { type: Number, default: 0 },
//   lockUntil: { type: Date },
//   forcePasswordChange: { type: Boolean, default: true } // 👈
// });

// // 🔒 Method to check if user is currently locked
// userSchema.methods.isLocked = function () {
//   return this.lockUntil && this.lockUntil > Date.now();
// };

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
role: {
  type: String,
  enum: ['UI/UX Designer', 'Node.js Developer', 'Backend Developer', 'Java Developer', 'Frontend Developer', 'Full-stack Developer', 'admin'],
  default: ''
},
status: {
  type: String,
  enum: ['Active','Inactive'],
  // required:true
},
  failedAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },
  forcePasswordChange: { type: Boolean, default: true } // 👈
});

// 🔒 Method to check if user is currently locked
userSchema.methods.isLocked = function () {
  return this.lockUntil && this.lockUntil > Date.now();
};

module.exports = mongoose.model('User', userSchema);