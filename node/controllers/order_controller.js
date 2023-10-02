const Pizza = require('../models/pizza_model')
const Order = require('../models/order_model')
const Ingredients = require('../models/ingredients')
const Razorpay = require('razorpay');
const orderController = require('../controllers/order_controller')

const customizedPlaceOrder = async (req, res) => {
    try {
        const { userId, pizzaId, ingredient, quantity } = req.body;

        let totalPrice = 0
        for (const id of ingredient) {
            const ingredientById = await Ingredients.findById(id)
            console.log(ingredientById)
            totalPrice += ingredientById.price
            console.log('totoalprice',totalPrice)

        }
        console.log('totoalprice', totalPrice)


        const order = new Order({
            user: userId,
            pizza: pizzaId,
            ingredient,
            quantity,
            totalPrice: totalPrice,
        });


        await order.save();

        res.status(201).json({ message: 'Customized pizza order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrder = async (req, res) => {
    const id = req.params.orderId

    try {
        const order = await Order.findById(id);
        res.status(200).json({message: 'orders fetched'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.satus(200).json({message: 'orders fetched', orders})
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}


const razorpay = new Razorpay({
    key_id: 'rzp_test_puuKYzg6YxSPdv',
    key_secret: '7JOvaQjaazG8IsopdBS1fGBb',
});

const createRazorpayOrder = async (req, res) => {
    try {
        const { totalPrice } = req.body;


        const options = {
            amount: totalPrice * 100, // Convert totalPrice to paise
            currency: 'INR', // Change to your currency code if needed
            receipt: 'order_receipt_1',
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({ orderId: razorpayOrder.id, totalPrice });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    customizedPlaceOrder,
    createRazorpayOrder,
    getOrders,
    getOrder


}