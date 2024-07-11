// controllers/reviewController.js
const Restaurant = require('../model/Addrestaurant');

const addReview = async (req, res) => {
  const { rating, comment } = req.body;
const {id} = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const newReview = {
    id,
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
  const { id } = req.params;

  try {
    console.log(id)
    const restaurant = await Restaurant.findById(id);
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
