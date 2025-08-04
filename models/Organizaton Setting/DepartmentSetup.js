const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  
  department: { 
    type: String, 
    enum: ['Engineering', 'HR', 'Sales', 'Finance', 'Marketing'], 
    required: true 
  },

  designation: { 
    type: String, 
    enum: ['Intern', 'Junior Developer', 'Senior Developer', 'Manager', 'Team Lead'], 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
