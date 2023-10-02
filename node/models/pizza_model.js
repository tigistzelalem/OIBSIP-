// models/pizza_base_model.js

const mongoose = require('mongoose');

const pizzaBaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredient: {
        sauces: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Sauce',
            },],

        cheese: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Cheese',
            },],

        veggies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Veggies',
            }],

        meat: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meat',
            }]
    },
    image: {
        type: String
    }


    
});

module.exports = mongoose.model('PizzaBase', pizzaBaseSchema);
