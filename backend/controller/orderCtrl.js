const express = require('express');
const router = express.Router();
const Order = require('../model/OrderModel');
const User = require('../model/UserModel');
const mongoose = require('mongoose');



const createOrder = async (req, res) => {
    const { userId, userName, items, totalPrice } = req.body;
  
  try {
    const newOrder = new Order({
      userId,
      userName,
      items,
      totalPrice
    });
    await newOrder.save();
    res.status(201).json({ order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getCurrentOrder = async(req,res)=>{
    
    const { orderId } = req.params;

    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ order });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };  

  const getAllUserOrders = async (req, res) => {
    const { userId } = req.params; // Use req.params to get userId
    console.log(userId)
    

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const orders = await Order.find({ userId });
        console.log(orders)
        res.status(200).send({ orders });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching orders', error });
    }
}; 

  
module.exports={createOrder, getCurrentOrder, getAllUserOrders};