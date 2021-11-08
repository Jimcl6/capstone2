const product = require('../models/Product');

module.exports.createProduct = (reqBody) => {
    let newProduct = new product({
        name: reqBody.name,
        description: reqBody.description,
        price: reqBody.price
    })

    return newProduct.save().then((success, err) => {
        if (err) {
            return false
        } else {
            return true
        }
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
            prodName: reqBody.prodName,
            prodDesc: reqBody.prodDesc,
            prodPrice: reqBody.prodPrice
        }
        // Syntax: findByIdAndUpdate(document id,updatesToBeApplied)
    return product.findByIdAndUpdate(reqParams.prodId, updatedProduct).then((course, error) => {
        if (error) {
            return false
        } else {
            return `updated product`
        }
    })
}

/* archive method */
module.exports.archiveProduct = (reqParams, reqBody) => {
    return product.findByIdAndUpdate(reqParams.prodId).then(result => {
        if (result == null) {
            return false
        } else {
            result.isActive = reqBody.isActive
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