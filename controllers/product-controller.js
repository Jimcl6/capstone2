const product = require('../models/Product');


/* add product */
module.exports.createProduct = (reqBody) => {
    let newProd = new product({
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

/* get specific product */
module.exports.getProduct = (reqParams) => {
    return product.findById(reqParams.productId).then(result => {
        return result;
    })
}

/* retrieve active courses */
module.exports.getActiveProducts = () => {
    return product.find({ isActive: true }).then(result => {
        return result;
    })
}

/* update a course */
module.exports.updateProduct = (reqParams, reqBody) => {
    let updatedProduct = {
            name: reqBody.name,
            prodDesc: reqBody.prodDesc,
            price: reqBody.price
        }
        // Syntax: findByIdAndUpdate(document id,updatesToBeApplied)
    return product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((course, error) => {
        if (error) {
            return false
        } else {
            return `updated product`
        }
    })
}

/* archive method */
module.exports.archiveProduct = (reqParams, reqBody) => {
    return product.findByIdAndUpdate(reqParams.productId).then(result => {
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