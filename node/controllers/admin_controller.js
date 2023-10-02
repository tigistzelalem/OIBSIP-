const PizzaBase = require('../models/pizza_model')
const Ingredients = require('../models/ingredients')
const Order = require('../models/order_model')
const nodemailer = require('nodemailer')
require('dotenv').config()



const getOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        return order;
        console.log(order)
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};


// Define the email transport and mail options (use your own transporter setup)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zelalemtigist21@gmail.com',
        pass: process.env.email_password,
    },
});

const sendOrderNotificationEmail = async (req, res) => {
    try {
        const orderId = req.params.orderId; // Assuming you're passing the order ID via URL parameter
        const orderDetails = await getOrderById(orderId);

        if (!orderDetails) {
            console.error('Order not found');
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        // Format the order details and include them in the email text
        const mailOptions = {
            from: 'zelalemtigist21@gmail.com', // Sender's email address
            to: 'makgg015@gmail.com', // Recipient's email address
            subject: 'New Order Received',
            text: `
               You have received a new order! Here are the order details:
                Pizza Base: ${orderDetails.pizzaBase}
                Sauce: ${orderDetails.sauce}
                Cheese: ${orderDetails.cheese}
                Veggies: ${orderDetails.veggies}
                Quantity: ${orderDetails.quantity}
                Total Price: $${orderDetails.totalPrice.toFixed(2)}
            `,
        };

        // Send the email with order details
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {

                console.error('Error sending email:', error);
                res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




const getIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredients.findById(req.params.id);
        return res.status(200).json({ message: 'success', ingredient });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching order details:', error });
    }
};


const getIngredients = async (req, res) => {
    try {
        const pizzaId = req.params.pizzaId;
        const { ingredientType } = req.params;

        // const validIngredientTypes = ["sauce", "cheese", "veggies", "meat"];

        // if (!validIngredientTypes.includes(ingredientType)) {
        //     return res.status(400).json({ message: "Invalid ingredient type" });
        // }

        const pizzaBase = await PizzaBase.findById(pizzaId);

        if (!pizzaBase) {
            return res.status(404).json({ message: "PizzaBase not found" });
        }

        const ingredients = await Ingredients.find({ base: pizzaBase._id, ingredientType });

        res.status(200).json({ ingredients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateIngredient = async (req, res) => {
    try {
        const { pizzaId, ingredientId } = req.params;
        const { name, price, ingredientType, base } = req.body;


        const ingredient = await Ingredients.findByIdAndUpdate({ ingredientId },
            {
                name,
                price,
                base,
                ingredientType,
            }, { new: true })

        const validIngredientTypes = ["sauce", "cheese", "veggies", "meat"];
        if (!validIngredientTypes.includes(ingredientType)) {
            return res.status(400).json({ message: "Invalid ingredient type" });
        }

        if (!ingredient) {
            return res.status(404).json({ message: `${ingredientType} not found` });
        }
        const pizzaBase = await PizzaBase.findById(pizzaId)
        await ingredient.save();
        console.log(pizzaBase.ingredient[ingredientType])
        pizzaBase.ingredient[ingredientType].push(ingredient._id);

        await pizzaBase.save();



        res.status(200).json({ message: `${ingredientType} updated successfully`, ingredient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addIngredientToPizzaBase = async (req, res) => {
    const { pizzaId } = req.params; // Get the pizzaId from the route parameter
    const { name, price, ingredientType } = req.body;
    try {
        const pizzaBase = await PizzaBase.findById(pizzaId);

        if (!pizzaBase) {
            return res.status(404).json({ message: 'PizzaBase not found' });
        }


        const ingredient = new Ingredients({
            name,
            price,
            base: pizzaId,
            ingredientType,
        });

        console.log(pizzaBase.ingredient[ingredientType])
        pizzaBase.ingredient[ingredientType].push(ingredient._id);
        await ingredient.save();
        await pizzaBase.save();



        res.status(200).json({ message: "added successfully", pizzaBase: pizzaBase });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteIngredient = async (req, res) => {
    try {
        const { pizzaId, ingredientId } = req.params;
        const pizzaBase = await PizzaBase.findById(pizzaId);
        const ingredient = await Ingredients.findById(ingredientId)
        const ingredientType = ingredient.ingredientType

        if (pizzaBase.ingredient[ingredientType].includes(ingredientId)) {
            pizzaBase.ingredient[ingredientType] = pizzaBase.ingredient[ingredientType].filter(
                (ingredient) => ingredient !== ingredientId
            );
        }
        // deletedIngredient.save()
        pizzaBase.save()
        const deletedIngredient = await Ingredients.findByIdAndDelete(ingredientId);
        if (!deletedIngredient) {
            return res.status(404).json({ message: `${ingredientType} not found` });
        }
        res.status(200).json({ message: 'deleted successfully ' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    sendOrderNotificationEmail,
    addIngredientToPizzaBase,
    getIngredients,
    getIngredient,
    updateIngredient,
    deleteIngredient

};



