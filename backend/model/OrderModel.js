const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the item schema
const ItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  itemRestro: { type: String, required: true },
  individualPrice: { type: Number, required: true }
});

// Define the order schema
const OrderSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  items: [ItemSchema],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Order Created', 'Order Accepted', 'Order is Being Prepared', 'Order Has Been Prepared', 'Order on Your Way', 'Order Delivered', 'Order Cancelled'],
    default: 'Order Created'
  },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
