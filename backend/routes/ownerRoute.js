const express = require("express");
const router = express.Router();
const Owner = require("../model/Resmodel"); // Ensure you have the correct path

// Fetch owner details by user ID
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const owner = await Owner.findById(userId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.json(owner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update owner details
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedOwner = await Owner.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.json(updatedOwner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
