const express = require('express');
// const cartCtrl = require('../controller/cartCtrl')
const jwt = require('jsonwebtoken');
const router = express.Router();
const {addToCart} = require('../controller/cartCtrl')
// const {createCart, deleteCartItem, updateCartItem}=require('../controller/cartCtrl')

// router.get('/',createCart);

// // DELETE /api/cart/:itemId
// router.delete('/:itemId', deleteCartItem);

// router.patch('/:itemId', updateCartItem);

router.post('/add-item',addToCart);
router.get()

module.exports= router;