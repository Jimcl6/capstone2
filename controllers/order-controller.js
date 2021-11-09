const order = require('../models/Order');
const user = require('../models/User');

/* retreive all orders */
module.exports.getOrders = () => {
    return order.find({}).then(result => {
        return result;
    })
}

module.exports.order = async(data) => {

    // using the "await" keywrd will allow the enroll method to complete updating the user before returning a response back.
    let isUserUpdated = await user.findById(data.userId).then(user => {
        user.userOrders.push({ productId: data.productId })

        return user.save().then((user, error) => {
            if (error) {
                return false
            } else {
                return true
            }
        })
    })

    // using the "await"keyword will allow the enroll method to complete the course before returning a response back.
    let isProductUpdated = await product.findById(data.productId).then(product => {
        // adds the userId in the course's enrollees array
        product.userOrders.push({ userId: data.userId });
        // save the updated course information information.
        return product.save().then((product, error) => {
            if (error) {
                return false
            } else {
                return true
            }
        })
    })

    // Condition that will check if the user and course documents have been updated
    // User enrollment is successful
    if (isUserUpdated && isProductUpdated) {
        return true
    } else {
        // user enrollment failed.
        return false
    }
}