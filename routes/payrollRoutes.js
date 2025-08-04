// const express = require('express');
// const router = express.Router();
// const Payroll = require('../models/Payroll');
// const Attendance = require('../models/Attendance');
// const User = require('../models/User');

// // Helper: Count Present Days for a Month
// const getPresentDays = async (userId, month) => {
//   const start = new Date(`${month}-01`);
//   const end = new Date(start);
//   end.setMonth(start.getMonth() + 1);

//   const attendance = await Attendance.find({
//     userId,
//     date: { $gte: start, $lt: end },
//     checkIn: { $exists: true }
//   });

//   return attendance.length;
// };

// // 🔹 Generate Payroll for User
// router.post('/generate', async (req, res) => {
//   try {
//     const { userId, month, baseSalary, workingDays } = req.body;

//     const presentDays = await getPresentDays(userId, month);
//     const perDaySalary = baseSalary / workingDays;
//     const netSalary = Math.round(perDaySalary * presentDays);

//     const payroll = new Payroll({
//       userId,
//       month,
//       baseSalary,
//       workingDays,
//       presentDays,
//       netSalary
//     });

//     await payroll.save();
//     res.status(201).json({ message: 'Payroll generated', payroll });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🔹 Get all payslips (Admin view)
// router.get('/all', async (req, res) => {
//   const payslips = await Payroll.find().populate('userId', 'name email');
//   res.json(payslips);
// });

// // 🔹 Get payslip for specific user and month
// router.get('/user/:userId/:month', async (req, res) => {
//   const { userId, month } = req.params;

//   const slip = await Payroll.findOne({ userId, month }).populate('userId', 'name email');

//   if (!slip) {
//     return res.status(404).json({ message: 'Payslip not found' });
//   }

//   res.json(slip);
// });

// // 🔹 Mark payroll as paid
// router.patch('/mark-paid/:id', async (req, res) => {
//   const payroll = await Payroll.findByIdAndUpdate(req.params.id, { status: 'Paid' }, { new: true });
//   res.json({ message: 'Payroll marked as paid', payroll });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Payroll = require('../models/Payroll'); // new payroll schema
const Employee = require('../models/User'); // new employee schema
const verifyToken = require('../middleware/verifyToken');
const mongoose = require('mongoose');

// 🔹 Generate Payroll for Employee
// router.post("/generate", async (req, res) => {
//   try {
//     const { employeeId, employeeName,month, basicSalary, hra, conveyance, medicalAllowance, otherAllowances, bonus, pfDeduction, taxDeduction, otherDeductions } = req.body;

//     // 🔹 Find employee details
//     const emp = await Employee.findById(employeeId);
//     if (!emp) return res.status(404).json({ message: "Employee not found" });

//     // 🔹 Calculations
//     const grossSalary = Number(basicSalary) + Number(hra) + Number(conveyance) + Number(medicalAllowance) + Number(otherAllowances) + Number(bonus);
//     const totalDeductions = Number(pfDeduction) + Number(taxDeduction) + Number(otherDeductions);
//     const netSalary = grossSalary - totalDeductions;

//     // 🔹 Create payroll
//     const payroll = new Payroll({
//       employeeId,
//       employeeName, // ✅ Auto-fill from DB
//       month,
//       basicSalary,
//       hra,
//       conveyance,
//       medicalAllowance,
//       otherAllowances,
//       bonus,
//       pfDeduction,
//       taxDeduction,
//       otherDeductions,
//       grossSalary,
//       totalDeductions,
//       netSalary,
//       status: "Pending"
//     });

//     await payroll.save();
//     res.status(201).json({ message: "Payroll generated successfully", payroll });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// 🔹 Generate Payroll for Employee
router.post("/generate", async (req, res) => {
  try {
    const { 
      employeeId, 
      month, 
      basicSalary, 
      hra, 
      conveyance, 
      medicalAllowance, 
      otherAllowances, 
      bonus, 
      pfDeduction, 
      taxDeduction, 
      otherDeductions 
    } = req.body;

    // ✅ Find employee details
    const emp = await Employee.findById(employeeId);
    if (!emp) return res.status(404).json({ message: "Employee not found" });

    // ✅ Calculations
    const grossSalary = Number(basicSalary) + Number(hra) + Number(conveyance) +
      Number(medicalAllowance) + Number(otherAllowances) + Number(bonus);
    const totalDeductions = Number(pfDeduction) + Number(taxDeduction) + Number(otherDeductions);
    const netSalary = grossSalary - totalDeductions;

    // ✅ Create payroll entry
    const payroll = new Payroll({
      employeeId,
      employeeName: emp.name, // 🛠 Fill from DB
      month,
      basicSalary,
      hra,
      conveyance,
      medicalAllowance,
      otherAllowances,
      bonus,
      pfDeduction,
      taxDeduction,
      otherDeductions,
      grossSalary,
      totalDeductions,
      netSalary,
      status: "Pending"
    });

    await payroll.save();
    res.status(201).json({ message: "Payroll generated successfully", payroll });

  } catch (error) {
    console.error("Payroll generation error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/my-payslips", verifyToken, async (req, res) => {
  try {
    console.log("Decoded user from token:", req.user); // 🔍 Debug

    // 🛠 ID validate
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: "Invalid user ID in token" });
    }

    const payslips = await Payroll.find({
      employeeId: new mongoose.Types.ObjectId(req.user.id) // ✅ Proper conversion
    }).sort({ month: -1 });

    res.json(payslips);
  } catch (error) {
    console.error("Error fetching payslips:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Get all payroll records (Admin View)
router.get('/all', async (req, res) => {
  try {
    const payslips = await Payroll.find();
    res.json(payslips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Get payroll by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const payroll = await Payroll.findById(req.params.id)
//       .populate("employeeId", "name email");

//     if (!payroll) {
//       return res.status(404).json({ message: "Payroll not found" });
//     }

//     res.json(payroll);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// 🔹 Get payroll for specific employee and month
router.get('/employee/:employeeId/:month', async (req, res) => {
  try {
    const { employeeId, month } = req.params;
    const slip = await Payroll.findOne({ employeeId, month }).populate('employeeId', 'name email');

    if (!slip) {
      return res.status(404).json({ message: 'Payslip not found' });
    }

    res.json(slip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Mark payroll as Paid
router.patch('/mark-paid/:id', async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      { status: 'Paid' },
      { new: true }
    );
    res.json({ message: 'Payroll marked as paid', payroll });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// router.get("/my-payslips", verifyToken, async (req, res) => {
//   try {
//     const payslips = await Payroll.find({ employeeId: req.user.id })
//       .sort({ month: -1 }); // Latest first
//     res.json(payslips);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



module.exports = router;
