// routes/restaurantRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const restadd = require('../model/Addrestaurant');

const router = express.Router();

// Register Route
router.post('/addRestaurant', async (req, res) => {
  const { resName, resAddress, resNumber, resOperationalHours } = req.body;

  try {
    const existingRest = await restadd.findOne({ resNumber });
    if (existingRest) {
      return res.status(400).json({ message: 'Restaurant with the same number already exists' });
    }
    const newRest = await restadd.create({ resName, resAddress, resNumber, resOperationalHours });
    res.json(newRest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
