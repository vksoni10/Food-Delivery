const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  resName: {
    type: String,
    required: true,
  },
  resReview: {
    type: String,
    required: false,
  },

  resImage: {
    type: String,
    required: false,
  },

  resAddress: {
    type: String,
    required: false,
  },

  resNumber: {
    type: Number,
    required: false,
  },

  resOperationalHours: {
    type: String,
    required: false,
  },
  resDiscount: {
    type: String,
    required: false,
  },

  menu: [
    {
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
    
    },
  ],

  rating: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Resadd", restaurantSchema);
