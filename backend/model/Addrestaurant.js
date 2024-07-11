const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  dishImage: {
    type: String,
    required: false,
  },
  dishType: {
    type: String,
    required: false,
  },
});

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const restaurantSchema = new mongoose.Schema({
  resDiscount: {
    type: String,
    required: false,
  },
  resName: {
    type: String,
    required: true,
  },
  resReview: [reviewSchema],
  resImage: [
    {
      type: String,
      required: false,
    },
  ],
  resAddress: {
    type: String,
    required: true,
  },
  resNumber: {
    type: Number,
    required: true,
  },
  resOperationalHours: {
    type: String,
    required: true,
  },
  menu: [menuItemSchema],
  rating: {
    type: Number,
    required: false,
  },
  restaurantTypes: [
    {
      type: String,
      required: false,
    },
  ],
});

module.exports = mongoose.model("Resadd", restaurantSchema);
