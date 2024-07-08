const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');

const JWT_SECRET = "jwt-secret-key";

const createUser = async (req, res) => {
    try {
        const email = req.body.email;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await User.create({ ...req.body, password: hashedPassword });
            res.status(201).json(newUser);
        } else {
            return res.status(400).json({ message: 'User already exists' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUserCtrl = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
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
};

const logoutUserCtrl = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Logout successful' });
};

module.exports = { createUser, loginUserCtrl, logoutUserCtrl };
