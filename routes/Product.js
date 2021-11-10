const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const auth = require('../auth');

/* add product */
router.post('/', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)
    if (userData.isAdmin == false) {
        res.send(`Logged in account is not an admin account`)
    } else {
        productController.createProduct(req.body).then(resultFromController => {
            res.send(resultFromController)
        })
    }
})

/* retrieve all active products */
router.get('/', (req, res) => {
    productController.getActiveProducts().then(resultFromController => res.send(resultFromController))
})

/* retrieve specific product */
router.get('/:productId', (req, res) => {
    productController.getProduct(req.params).then(resultFromController => res.send(resultFromController))
})


/* update product information */
router.put('/update-product', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)
    if (userData.isAdmin == true) {
        productController.updateProduct(req.params).then(resultFromController => res.send(resultFromController))
    } else {
        res.send(`Logged in account is not an admin.`)
    }
})

/* archive product */
router.put('/:id/archive', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)
    if (userData.isAdmin == true) {
        productController.archiveProduct(req.params).then(resultFromController => res.send(resultFromController))
    } else {
        res.send(`Logged in account is not an admin.`)
    }
})
module.exports = router;