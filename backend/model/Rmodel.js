const mongoose = require("mongoose");
import React, { useEffect, useState } from "react";

var rSchema = new mongoose.Schema({
  rname: {
    type: String,
    required: true,
  },
  remail: {
    type: String,
    required: true,
    unique: true,
  },
  rmobile: {
    type: String,
    required: true,
    unique: true,
  },
  rpassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Restaurant", rSchema);
