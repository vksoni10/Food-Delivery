const mongoose = require("mongoose");

var aSchema = new mongoose.Schema({
  aName: {
    type: String,
    required: true,
  },
  aEmail: {
    type: String,
    required: true,
    unique: true,
  },
  aMobile: {
    type: String,
    required: true,
    unique: true,
  },
  aPassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", aSchema);
