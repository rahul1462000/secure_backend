const express = require("express");
const router = express.Router();
const Payslip = require("../models/Payslip");

/**
 * Admin - Create/Generate a Payslip
 * POST /api/payslip
 */
router.post("/", async (req, res) => {
  try {
    const payslip = new Payslip(req.body);
    await payslip.save();
    res.status(201).json({ message: "Payslip generated successfully", payslip });
  } catch (err) {
    res.status(500).json({ error: "Failed to create payslip", details: err.message });
  }
});

/**
 * Admin - Update a Payslip
 * PUT /api/payslip/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const payslip = await Payslip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payslip) return res.status(404).json({ error: "Payslip not found" });
    res.json({ message: "Payslip updated successfully", payslip });
  } catch (err) {
    res.status(500).json({ error: "Failed to update payslip" });
  }
});

/**
 * User - Get All Payslips for a User
 * GET /api/payslip/all?userId=123
 */
router.get("/all", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "User ID required" });

    const slips = await Payslip.find({ userId }).sort({ year: -1, month: -1 });
    res.json(slips);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payslips" });
  }
});

/**
 * User - Get Single Payslip for a Month
 * GET /api/payslip?userId=123&month=July
 */
router.get("/", async (req, res) => {
  try {
    const { userId, month } = req.query;
    if (!userId || !month) return res.status(400).json({ error: "User ID and month required" });

    const slip = await Payslip.findOne({ userId, month });
    if (!slip) return res.status(404).json({ error: "Payslip not found" });

    res.json(slip);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payslip" });
  }
});

module.exports = router;
