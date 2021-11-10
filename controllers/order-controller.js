const order = require('../models/Order');
const user = require('../models/User');
const product = require('../models/Product');

/* retreive all orders */
module.exports.getOrders = () => {
    return order.find({}).then(result => {
        return result;
    })
}

module.exports.order = async(data) => {

    let isUserUpdated = await user.findById(data.userId).then(user => {
        user.orders.push({ productId: data.productId })
        return order.save().then((user, error) => {
            if (error) {
                return false
            } else {
                return true
            }
        })
    })

    let isProductUpdated = await product.findById(data.productId).then(product => {
        product.customer.push({ userId: data.userId });
        return order.save().then((product, error) => {
            if (error) {
                return false
            } else {
                return true
            }
        })
    })

    if (isUserUpdated && isProductUpdated) {
        return true
    } else {
        return false
    }
}