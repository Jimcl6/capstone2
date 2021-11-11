const Order = require('../../capstone2/models/Order');
const User = require('../../capstone2/models/User');
const Product = require('../../capstone2/models/Product');

/* retreive all orders */
module.exports.getOrders = () => {
    return order.find({}).then(result => {
        return result;
    })
}

// - Non-admin User checkout (Create Order)
module.exports.checkout = async(data) => {
    console.log(data);
    let isOrderUpdated = await User.findById(data.userId).then(user => {

        return Order.find({}).then(order => {


            if (data.quantity < 1 || data.quantity == null) {
                data.quantity = 1;
            }

            let orderData = new Order({

                totalAmount: product.price * data.quantity,
                user: {
                    userId: data.userId,
                    userEmail: user.email
                },
                product: {
                    productId: data.productId,
                    productName: product.name
                }
            })

            return orderData.save().then((addOrder, error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Order added successfully')

                }

                let userOrderData = {

                    orderId: orderData.id,
                    totalAmount: orderData.totalAmount,
                    product: {
                        productId: data.productId,
                        productName: product.name
                    }
                }

                user.order.push(userOrderData)

                return user.save().then((userUpdate, error) => {
                    if (userUpdate && addOrder) {
                        console.log("user order details save.")
                        return true
                    } else {
                        return false

                    }
                })

            })

        })

    })
    if (isOrderUpdated) {
        return true
    } else {
        return false
    }
}