const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    totalAmount: {
        type: Number
    },
    purchasedOn: {
        type: Date,
        default: new Date()
    },
    userOrders: [{
        userId: {
            type: String,
            required: [true, 'User ID is required']
        },
        productId: {
            type: String,
            required: [true, `Product ID is required`]
        }
    }]
})

module.exports = mongoose.model(`Order`, orderSchema)