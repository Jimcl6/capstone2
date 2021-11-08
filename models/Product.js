const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    prodName: {
        type: String,
        require: [true, 'Product name is required']
    },
    prodDesc: {
        type: String,
        require: [true, 'Product description is required']
    },
    prodPrice: {
        type: Number,
        require: [true, 'Product price is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    customer: [{
        customerId: {
            type: String,
            require: [true, 'Customer is required']
        },
        boughtOn: {
            type: Date,
            default: new Date()
        },

    }]

})

module.exports = mongoose.model('Product', productSchema)