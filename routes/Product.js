const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const auth = require('../auth');

router.post('/', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)

    if (userData.isAdmin == false) {
        res.send(`Logged in account is not an admin account`)
    } else {
        productController.createProduct(userDatareq.body).then(resultFromController => {
            res.send(resultFromController)
        })
    }
})

/* retrieve all active products */
router.get('/active-courses', (req, res) => {
    productController.getActiveProducts().then(resultFromController => res.send(resultFromController))
})

/* retrieve specific course */
router.get('/:productId', (req, res) => {
    productController.getProduct(req.params).then(resultFromController => res.send(resultFromController))
})

module.exports = router;