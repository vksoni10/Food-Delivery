const express = require("express");
const router = express.Router();
const Order = require("../model/OrderModel");

// Fetch orders by restaurant name (resName)
// Fetch orders by restaurant name (resName)
router.get("/:resName", async (req, res) => {
  try {
    const resName = req.params.resName;
    const orders = await Order.find({ "items.itemRestro": resName });

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this restaurant" });
    }

    const filteredOrders = orders
      .map((order) => {
        const filteredItems = order.items.filter(
          (item) => item.itemRestro === resName
        );
        return {
          ...order._doc,
          items: filteredItems,
        };
      })
      .filter((order) => order.items.length > 0);

    if (!filteredOrders.length) {
      return res
        .status(404)
        .json({ message: "No order items found for this restaurant" });
    }

    res.json(filteredOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update order status
router.put("/updateStatus/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
