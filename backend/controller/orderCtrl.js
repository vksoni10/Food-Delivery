const express = require('express');
const router = express.Router();
const Order = require('../model/OrderModel');

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

  
module.exports={createOrder, getCurrentOrder};