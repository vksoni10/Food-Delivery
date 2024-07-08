const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  Resname: {
    type: String,
    required: true,
  },

  Resimage: {
    type: String,
    required: true,
  },

  Resaddress: {
    type: String,
    required: true,
  },

  Resnumber: {
    type: Number,
    required: true,
  },

  menu: [
    {
      Dishname: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      Dishimage: {
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
