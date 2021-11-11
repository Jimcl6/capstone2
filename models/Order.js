const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    totalAmount: {
        type: Number
    },
    purchasedOn: {
        type: Date,
        default: new Date()
    },
    user: [{
        userId: {
            type: String,
            required: [true, 'User ID is required']
        },
        userEmail: {
            type: String,
            required: [true, 'User email is required']
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

module.exports = mongoose.model(`Order`, orderSchema)