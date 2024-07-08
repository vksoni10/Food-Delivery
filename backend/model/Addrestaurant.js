const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  resName: {
    type: String,
    required: true,
  },
  resReview: {
    type: String,
    required: true,
  },

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

  menu: [
    {
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
        required: true,
      },
      resDiscount: {
        type: String,
        required: true,
      },
    },
  ],

  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Resadd", restaurantSchema);
