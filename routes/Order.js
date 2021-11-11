const express = require('express');
const router = express.Router();
const orderController = require('../controllers/user-controller');
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
        userId: userData.id,
        productId: req.body.productId,
        totalAmount: userData.totalAmount++
    }

    if (userData.isAdmin == true) {
        console.log(data);
        orderController.order(data).then(resultFromController => res.send(resultFromController));

    } else {
        res.send(`User Not Authorized.`)
    }
})



module.exports = router;