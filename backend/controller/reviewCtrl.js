// controllers/reviewController.js
const Restaurant = require('../model/Addrestaurant');

const addReview = async (req, res) => {
  const { restaurant_id, user_id, rating, comment } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const newReview = {
      user_id,  
      rating,
      comment,
    };

    restaurant.resReview.push(newReview);
    await restaurant.save();

    res.status(201).json(newReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getReviewsByRestaurant = async (req, res) => {
  const { restaurant_id } = req.params;

  try {
    const restaurant = await Restaurant.findById(restaurant_id).populate('resReview.user_id', 'name');
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(restaurant.resReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addReview, getReviewsByRestaurant };
