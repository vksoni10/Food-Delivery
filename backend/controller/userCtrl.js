const User = require ('../model/UserModel');
const { generateToken } = require('../config/jwtToken');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');


const JWT_SECRET = "jwt-secret-key";
const createUser = asyncHandler(async(req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if(!findUser) {
        const newUser = await User.create(req.body)
        res.json(newUser)
    }else{
       throw new Error('User Already Exists')
    }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
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

module.exports=loginUserCtrl;