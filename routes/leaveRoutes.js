// const express = require('express');
// const router = express.Router();
// const Leave = require('../models/Leave');

// // Apply for Leave
// router.post('/apply-leave', async (req, res) => {
//   try {
//     const { fromDate, toDate, leaveType, note, notifyTo } = req.body;

//     const leave = new Leave({ fromDate, toDate, leaveType, note, notifyTo });

//     await leave.save();

//     res.status(201).json({ message: 'Leave request submitted successfully', leave });
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// });

// // Get All Leave Requests
// router.get('/all-leaves', async (req, res) => {
//   try {
//     // const leaves = await Leave.find();
//     const leaves = await Leave.find({ status: "Pending" });
//     res.status(200).json(leaves);
//   } catch (err) {
//     console.error("Error fetching leaves:", err);
//     res.status(500).json({ message: "Server error while fetching leaves" });
//   }
// });

// // Approve or Reject leave
// router.put('/update-leave-status/:id', async (req, res) => {
//   try {
//     const { status } = req.body; // "Approved" or "Rejected"
    
//     // Check if valid status is provided
//     if (!['Approved', 'Rejected'].includes(status)) {
//       return res.status(400).json({ message: 'Invalid status' });
//     }

//     const leave = await Leave.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!leave) {
//       return res.status(404).json({ message: 'Leave not found' });
//     }

//     res.status(200).json({ message: `Leave ${status} successfully`, leave });
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// });

// router.get('/my-leaves/:userId', async (req, res) => {
//   try {
//     const leaves = await Leave.find({ notifyTo: req.params.userId });
//     res.status(200).json(leaves);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching user leaves' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');

// Apply for Leave
// router.post('/apply-leave', async (req, res) => {
//   try {
//     const { fromDate, toDate, leaveType, note, notifyTo } = req.body;

//     const leave = new Leave({ fromDate, toDate, leaveType, note, notifyTo });

//     await leave.save();

//     res.status(201).json({ message: 'Leave request submitted successfully', leave });
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// });
router.post('/apply-leave', async (req, res) => {
  try {
    const { userId, fromDate, toDate, leaveType, note, notifyTo } = req.body;

    const leave = new Leave({
      userId,
      fromDate,
      toDate,
      leaveType,
      note,
      notifyTo,
      status: 'Pending'
    });

    await leave.save();
    res.status(201).json({ message: 'Leave request submitted successfully!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting leave request' });
  }
});


// Get All Leave Requests
router.get('/all-leaves', async (req, res) => {
  try {
    const leaves = await Leave.find({ status: "Pending" });
    res.status(200).json(leaves);
  } catch (err) {
    console.error("Error fetching leaves:", err);
    res.status(500).json({ message: "Server error while fetching leaves" });
  }
});

// Approve or Reject leave
router.put('/update-leave-status/:id', async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    
    // Check if valid status is provided
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    res.status(200).json({ message: `Leave ${status} successfully`, leave });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// router.get('/my-leaves/:userId', async (req, res) => {
//   try {
//     const leaves = await Leave.find({ notifyTo: req.params.userId });
//     res.status(200).json(leaves);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching user leaves' });
//   }
// });

// In your leave route
router.get("/my-leaves/:userId", async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.params.userId })
      .sort({ createdAt: -1 }); // newest first
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
