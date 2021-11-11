const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    order: [{
        productId: {
            type: String,
            required: [true, `Product ID is required`]
        },
        totalAmount: {
            type: Number,
            default: 1
        },
        purchasedOn: {
            type: Date,
            default: new Date()
        },
    }],
})

module.exports = mongoose.model('Users', userSchema)