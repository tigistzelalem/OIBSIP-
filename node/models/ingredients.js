
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    base: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PizzaBase', // Reference to the pizza base model
    },
    ingredientType: {
        type: String,
        required: true,
    },
    // Add any other fields specific to ingredients here
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
