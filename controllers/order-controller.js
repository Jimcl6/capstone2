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
        user.userOrders.push({ productId: data.productId })
        console.log({ productId: data.productId })
        return user.save().then((user, error) => {
            if (error) {
                return false
            } else {
                return true
            }
        })
    })

    let isProductUpdated = await product.findById(data.courseId).then(product => {
        product.enrollees.push({ userId: data.userId });
        console.log({ userId: data.userId })
        return product.save().then((product, error) => {
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