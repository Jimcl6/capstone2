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
    products: [{
        prodId: {
            type: String,
            required: [true, 'Product is required']
        },
        boughtOn: {
            type: Date,
            default: new Date()
        },
        status: {
            type: String,
            default: 'pending-order'
        }
    }]
})

module.exports = mongoose.model('Users', userSchema)