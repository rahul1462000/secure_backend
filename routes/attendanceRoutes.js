// routes/attendance.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// POST /checkin
router.post('/checkin', async (req, res) => {
  try {
    const { userId, checkIn, date } = req.body;

    const normalizedDate = date
      ? new Date(new Date(date).setHours(0, 0, 0, 0))
      : new Date().setHours(0, 0, 0, 0);

    const attendance = new Attendance({
      userId,
      checkIn,
      date: normalizedDate
    });

    await attendance.save();
    res.status(201).json({ message: "Check-in recorded", attendance });

  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Attendance already marked for this date" });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
});


// PUT /checkout
router.put('/checkout', async (req, res) => {
  try {
    const { userId, checkOut, date } = req.body;

    const normalizedDate = date
      ? new Date(new Date(date).setHours(0, 0, 0, 0))
      : new Date().setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({ userId, date: normalizedDate });

  if (attendance.checkOut) {
  return res.status(400).json({ message: "Check-out already marked for this date" });
}

    attendance.checkOut = checkOut;
    await attendance.save();

    res.status(200).json({ message: "Check-out recorded", attendance });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 3️⃣ Get All Attendance
router.get('/all', async (req, res) => {
  try {
    const data = await Attendance.find().populate('userId', 'name email');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

// 1️⃣ Check-In API
// router.post('/checkin', async (req, res) => {
//   try {
//     const { userId, checkIn } = req.body;
//     const dateOnly = new Date().setHours(0, 0, 0, 0);

//     let attendance = await Attendance.findOne({ userId, date: dateOnly });

//     if (attendance) {
//       return res.status(400).json({ message: 'Already checked in today' });
//     }

//     attendance = new Attendance({ userId, date: dateOnly, checkIn });
//     await attendance.save();

//     res.status(201).json({ message: 'Check-in successful', attendance });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// 2️⃣ Check-Out API
// router.put('/checkout', async (req, res) => {
//   try {
//     const { userId, checkOut } = req.body;
//     const dateOnly = new Date().setHours(0, 0, 0, 0);

//     const attendance = await Attendance.findOne({ userId, date: dateOnly });

//     if (!attendance) {
//       return res.status(404).json({ message: 'Check-in not found for today' });
//     }

//     attendance.checkOut = checkOut;
//     await attendance.save();

//     res.status(200).json({ message: 'Check-out successful', attendance });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });
