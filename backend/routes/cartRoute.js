const express = require('express');
// const cartCtrl = require('../controller/cartCtrl')
const jwt = require('jsonwebtoken');
const router = express.Router();
const {addToCart, getCartItems, deleteItem, updateItem} = require('../controller/cartCtrl')


router.get('/get-cart-items', getCartItems);
router.post('/add-to-cart',addToCart);
router.delete('/remove-item/:itemId', deleteItem);
router.patch('/update-item', updateItem);


module.exports= router;