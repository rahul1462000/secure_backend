const express = require("express");
const Holiday = require("../../models/Organizaton Setting/Holiday");
const router = express.Router();

// 📌 Add a holiday
router.post("/add", async (req, res) => {
  try {
    const { title, date, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and Date are required" });
    }

    const holiday = new Holiday({ title, date, description });
    await holiday.save();
    res.status(201).json({ message: "Holiday added successfully", holiday });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 📌 Get all holidays
router.get("/all", async (req, res) => {
  try {
    const holidays = await Holiday.find().sort({ date: 1 });
    res.status(200).json(holidays);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 📌 Update holiday
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Holiday not found" });

    res.status(200).json({ message: "Holiday updated successfully", holiday: updated });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 📌 Delete holiday
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Holiday.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Holiday not found" });

    res.status(200).json({ message: "Holiday deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
