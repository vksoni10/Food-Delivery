const Restaurant = require('../model/Addrestaurant');


const getRestProfile = async (req, res) => {
    try {
        
        const Rest = await Restaurant.find({});          
        if (!Rest) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }else{
            res.json(Rest);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteRestProfile = async (req,res) => {
    try {
        const { id } = req.params;
        await Restaurant.findByIdAndDelete(id);    
        res.json({ message: 'Restaurant deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }

}
module.exports = {getRestProfile, deleteRestProfile};