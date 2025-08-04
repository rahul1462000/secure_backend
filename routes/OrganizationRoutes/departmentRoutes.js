const express = require('express');
const router = express.Router();
const Employee = require('../../models/Organizaton Setting/DepartmentSetup');

// Create Employee
router.post('/create', async (req, res) => {
  try {
    const { department, designation } = req.body;
    const employee = new Employee({ department, designation });
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Get All Employees
router.get('/all', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Update Employee
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Employee updated successfully', updated });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Delete Employee
router.delete('/delete/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
