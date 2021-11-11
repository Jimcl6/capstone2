const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');
const auth = require('../auth')

/* retrieve all orders */
router.get('/', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)

    if (userData.isAdmin == true) {
        orderController.getOrders().then(resultFromController => res.send(resultFromController))
    } else {
        res.send(`Logged in account is not an admin.`)
    }
})

/*  */
router.post('/order', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)

    let data = {
        quantity: req.body.quantity,

        userId: userData.id,
        productId: req.body.productId
    }
    console.log(data);
    orderController.order(data).then(resultFromController => res.send(resultFromController));
})



module.exports = router;