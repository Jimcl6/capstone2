const user = require('../models/User');
const bcrypt = require('bcrypt')
const auth = require(`../auth`)
const product = require('../models/Product');



/* check email duplicate */
module.exports.checkEmailExists = (reqBody) => {
    return user.find({ email: reqBody.email }).then(result => {
        if (result.length > 0) {
            return true
        } else {
            return false
        }
    })
}

/* register account */
module.exports.registerUser = (reqBody) => {
    let newUser = new user({
        email: reqBody.email,
        mobileNo: reqBody.mobileNo,
        password: bcrypt.hashSync(reqBody.password, 10)
    })
    return newUser.save().then((user, error) => {
        if (error) {
            return false
        } else {
            return true
        }
    })
}

/* user authentication */
module.exports.loginUser = (reqBody) => {
    return user.findOne({ email: reqBody.email }).then(result => {
        if (result == null) {
            return false
        } else {
            /* if bcrypt is present this will only detect encrypted passwords */
            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)
            if (isPasswordCorrect) {
                return { access: auth.createAccessToken(result) }
            } else {
                return false
            }
        }
    })
}

/* admin enabler */
module.exports.makeAdmin = (reqParams) => {
    return user.findByIdAndUpdate(reqParams.id).then(result => {
        if (result == null) {
            return false
        } else {
            result.isAdmin = true
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

/* retrieve all orders */
module.exports.getOrders = (reqBody) => {
    return user.find({ order: reqBody.order }).then(result => {
        return result;
    })
}



/* add order */
module.exports.order = async(data) => {

    let isUserUpdated = await user.findById(data.userId).then(user => {
        user.order.push({
            productId: data.productId,
            totalAmount: data.totalAmount
        })

        return user.save().then((user, error) => {
            if (error) {
                return false
            } else {
                return true
            }
        })
    })

    // using the "await"keyword will allow the enroll method to complete the course before returning a response back.
    let isProductUpdate = await product.findById(data.prodId).then(course => {
        // adds the userId in the course's enrollees array
        product.order.push({ userId: data.userId });
        // save the updated course information information.
        return product.save().then((course, error) => {
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