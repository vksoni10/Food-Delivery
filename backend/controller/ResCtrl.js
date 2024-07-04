const Restaurant = require("../model/RModel");
const { generateToken } = require("../config/jwtToken");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");

const JWT_SECRET = "jwt-secret-key";
const createUser = asyncHandler(async (req, res) => {
  const rEmail = req.body.rEmail;
  const findUser = await User.findOne({ rEmail: rEmail });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

const loginResCtrl = asyncHandler(async (req, res) => {
  const { rEmail, rPassword } = req.body;

  try {
    const user = await Restaurant.findOne({ rEmail });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(rPassword, user.rPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { rEmail: user.rEmail, rName: user.rName, id: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = loginResCtrl;
