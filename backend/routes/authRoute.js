const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');
// const loginUserCtrl= require('../controller/userCtrl')

const router = express.Router();
const JWT_SECRET = "jwt-secret-key";  // Ensure you have a strong secret key and store it securely

// Register route
router.post('/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with the same email or phone number already exists' });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ name, email, mobile, password: hash });
    res.json(newUser);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
// router.post('/login', loginUserCtrl);
// Login route
router.post('/login', async (req, res) => {
  const {email, password } = req.body;

  try {
    const user = await UserModel.findOne({email});
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    const token = jwt.sign({ email: user.email, name: user.name, id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
