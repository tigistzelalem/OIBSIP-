const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza', // Reference to the Pizza model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  ingredient: [
    { type: mongoose.Schema.Types.ObjectId, }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model('Order', orderSchema);
