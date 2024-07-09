// models/Restaurant.js
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dishImage: {
    type: String,
    required: false,
  },
  resDiscount: {
    type: String,
    required: true,
  },
});

const restaurantSchema = new mongoose.Schema({
  resDiscount: {
    type: String,
    required: true,
  },
  resName: {
    type: String,
    required: true,
  },
  resReview: [
    {
      type: String,
      required: true,
    },
  ],
  resImage: {
    type: String,
    required: true,
  },
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
    required: true,
  },
});

module.exports = mongoose.model("Resadd", restaurantSchema);
