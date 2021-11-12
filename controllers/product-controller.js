const Product = require('../models/Product');


/* add Product */
module.exports.createProduct = (reqBody) => {
    let newProd = new Product({
        name: reqBody.name,
        prodDesc: reqBody.prodDesc,
        price: reqBody.price
    })
    return newProd.save().then((prod, err) => {
        if (err) {
            return false
        } else {
            return true
        }
    })
}

/* get specific Product */
module.exports.getProduct = (reqParams) => {
    return Product.findById(reqParams.id).then(result => {
        return result;
    })
}

/* retrieve active product */
module.exports.getActiveProducts = () => {
    return Product.find({ isActive: true }).then(result => {
        return result;
    })
}

/* update a product */
module.exports.updateProduct = (reqParams, reqBody) => {
    let updatedProduct = {
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price
        }
        // Syntax: findByIdAndUpdate(document id,updatesToBeApplied)
    return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product, error) => {
        if (error) {
            return false
        } else {
            return product
        }
    })
}

/* archive method */
module.exports.archiveProduct = (reqParams, reqBody) => {
    return Product.findByIdAndUpdate(reqParams.productId).then(result => {
        if (result == null) {
            return false
        } else {
            result.isActive = false
            return result.save().then((success, saveErr) => {
                if (saveErr) {
                    console.log(saveErr)
                    return false
                } else {
                    return success
                }
            })
        }
    })

}