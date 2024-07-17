const express = require('express');
const router = express.Router();
const Restaurant = require('../model/Addrestaurant'); // Ensure you have the correct path

// Fetch restaurant details by restaurant name
router.get('/:resName', async (req, res) => {
  try {
    const { resName } = req.params;
    const restaurant = await Restaurant.findOne({ resName });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update restaurant details
router.put('/:resName', async (req, res) => {
  try {
    const { resName } = req.params;
    const updatedRestaurant = await Restaurant.findOneAndUpdate({ resName }, req.body, { new: true });
    res.json(updatedRestaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
