const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    // Check if user with the same email or mobile already exists
    const existingUser = await UserModel.findOne({ $or: [{ email }, { mobile }] });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User with the same email or phone number already exists' });
    }

    // Hash the password and create a new user
    const hash = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ name, email, mobile, password: hash });
    res.json(newUser);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json('User not exist');
      }

      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ email: user.email, name: user.name }, "jwt-secret-key", { expiresIn: "1d" });
          res.cookie('token', token, { httpOnly: true });
          res.json('Success');
        } else {
          res.status(401).json('Password is incorrect');
        }
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    });
});

module.exports = router;
