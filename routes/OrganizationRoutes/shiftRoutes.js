const express = require("express");
const router = express.Router();
const Shift = require("../../models/Organizaton Setting/Shift");

// ➤ Create a shift
router.post("/add", async (req, res) => {
  try {
    const { shiftName, startTime, endTime } = req.body;

    if (!shiftName || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newShift = new Shift({ shiftName, startTime, endTime });
    await newShift.save();

    res.status(201).json({ message: "Shift added successfully", shift: newShift });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ➤ Get all shifts
router.get("/all", async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.status(200).json(shifts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ➤ Update shift
router.put("/update/:id", async (req, res) => {
  try {
    const updatedShift = await Shift.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedShift) {
      return res.status(404).json({ message: "Shift not found" });
    }
    res.status(200).json({ message: "Shift updated successfully", shift: updatedShift });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ➤ Delete shift
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedShift = await Shift.findByIdAndDelete(req.params.id);
    if (!deletedShift) {
      return res.status(404).json({ message: "Shift not found" });
    }
    res.status(200).json({ message: "Shift deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
