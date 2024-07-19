// backend/controllers/AdminOrderController.js
const Order = require('../model/OrderModel');
// const User = require('../model/UserModel');

    const getAllUserOrders = async (req, res) => {
        try {
            
            const orders = await Order.find({});          
            if (!orders) {
                return res.status(404).json({ message: 'User not found' });
            }else{
                res.json(orders);
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server error' });
        }
    };
    

  
module.exports={getAllUserOrders};
