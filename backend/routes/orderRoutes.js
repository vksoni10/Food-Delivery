const express = require('express');
const router = express.Router();
const Order = require('../model/OrderModel');

router.post('/create', async (req, res) => {
  const { userId, userName, restaurantName, items, totalPrice } = req.body;

  try {
    const newOrder = new Order({
      userId,
      userName,
      restaurantName,
      items,
      totalPrice
    });
    await newOrder.save();
    res.status(201).json({ order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:orderId', async (req, res) => {
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
});
// Assuming you are using Express.js in your backend
router.get('/user-orders', async (req, res) => {
  const { userId } = req.query;
  try {
    const orders = await Order.find({ userId });
    res.status(200).send({ orders });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching orders', error });
  }
});


module.exports = router;
