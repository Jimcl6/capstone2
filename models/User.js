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
        userId: {
            type: String,
            required: [true, 'User ID is required']
        },
        totalAmount: {
            type: Number,
            required: [true, 'Total amount is required']
        },
        product: [{
            productId: {
                type: String,
                required: [true, 'product id is required']
            },
            productName: [{
                type: String,
                required: [true, 'product name is required']
            }]
        }]
    }]
})

module.exports = mongoose.model('Users', userSchema)