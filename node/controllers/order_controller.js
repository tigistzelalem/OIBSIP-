const Pizza = require('../models/pizza_model')
const Order = require('../models/order_model')
const Ingredients = require('../models/ingredients')
const Razorpay = require('razorpay');
const orderController = require('../controllers/order_controller')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zelalemtigist21@gmail.com',
        pass: process.env.email_password,
    },
});

const customizedPlaceOrder = async (req, res) => {
    try {
        const { userId, pizzaId, ingredient, quantity } = req.body;

        let totalPrice = 0
        const pizza = await Pizza.findById(pizzaId);
        if (!pizza) {
            return res.status(404).json({message: 'Pizza not found'})
        } else {
            totalPrice += pizza.price;
        }
        
        for (const id of ingredient) {
            const ingredientById = await Ingredients.findById(id)
            console.log(ingredientById)
            totalPrice += ingredientById.price
            console.log('totoalprice', totalPrice)

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
        console.log(order)

        // const orderId = req.params.orderId
        // const orderDetails = await get

        const mailOptions = {
            from: 'zelalemtigist21@gmail.com', // Sender's email address
            to: 'makgg015@gmail.com', // Recipient's email address
            subject: 'New Order Received',
            text: `
               You have received a new order! Here are the order details:
                Pizza Base: ${order.pizzaBase}
                Sauce: ${order.sauce}
                Cheese: ${order.cheese}
                Veggies: ${order.veggies}
                Quantity: ${order.quantity}
                Total Price: $${order.totalPrice.toFixed(2)}
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {

                console.error('Error sending email:', error);
                res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Email sent successfully' });
            }
        });

        res.status(201).json({ message: 'Customized pizza order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrder = async (req, res) => {
    const id = req.params.orderId

    try {
        const order = await Order.findById(id);
        res.status(200).json({ message: 'orders fetched', order })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ message: 'orders fetched', orders })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            res.status(404).json({ message: 'order not found' });
        }

        res.status(200).json({ message: 'order deleted successfully' });



    } catch (error) {
        res.status(500).json({ message: error.message });
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
            amount: totalPrice * 100,
            currency: 'INR',
            receipt: 'order_receipt_1',
        };

        const razorpayOrder = await razorpay.orders.create(options);
        // res.redirect(razorpayOrder.razorpay_payment_url);
        res.status(200).json({ orderId: razorpayOrder.id, totalPrice });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    customizedPlaceOrder,
    createRazorpayOrder,
    getOrders,
    getOrder,
    deleteOrder


}