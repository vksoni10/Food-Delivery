const User = require('../model/UserModel');


const getUserProfile = async (req, res) => {
    try {
        
        const user = await User.find({});          
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }else{
            res.json(user);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {getUserProfile};