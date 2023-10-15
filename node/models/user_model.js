const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'

    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
    otpCode: {
        type: Number
    }
})

module.exports = mongoose.model('User', UserSchema);
