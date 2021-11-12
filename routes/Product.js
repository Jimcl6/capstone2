const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const auth = require('../auth');

/* add product */
router.post('/', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)
    if (userData.isAdmin == false) {
        res.send(`User not authorized.`)
    } else {
        productController.createProduct(req.body).then(resultFromController => {
            res.send(resultFromController)
        })
    }
})

/* retrieve all active products */
router.get('/products', (req, res) => {
    productController.getActiveProducts().then(resultFromController => res.send(resultFromController))
})

/* retrieve specific product */
router.get('/:productId', (req, res) => {
    productController.getProduct(req.params).then(resultFromController => res.send(resultFromController))
})


/* update product information */
router.put('/:productId/update', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)

    if (userData.isAdmin == false) {
        res.send(`User Not Authorized`)
    } else {
        productController.updateProduct(req.params, req.body).then(resultFromController => res.send(resultFromController))
    }

})

/* archive product */
router.put('/:productId/archive', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)

    if (userData.isAdmin == false) {
        res.send('User not Authorized.')
    } else {
        productController.archiveProduct(req.params, req.body).then(resultFromController => res.send(resultFromController))
    }
})

module.exports = router;