const jwt = require('jsonwebtoken');
const secret = 'ProductOrderAPI';

module.exports.createAccessToken = (user) => {
    // the data will be received from the registration form
    // when hte user logs in, a token will be created with user's information
    const data = {
        id: user.id,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin

    }

    // Generate a JSON web tkoen using the jwt's sign method
    // Generates the token using the form data, and the secret code with no additional options provided.
    return jwt.sign(data, secret, {})
}

module.exports.verify = (req, res, next) => {
    // the token retrieved from the request header.
    let token = req.headers.authorization;

    // if token is received and is not undefined
    if (typeof token !== "undefined") {
        console.log(token)
        // the token sent is a type of "bearer" token which when received contains the "bearer" as a prefix to the string/
        // Syntax: string.slice(start, end)
        token = token.slice(7, token.length)
        // 
        return jwt.verify(token, secret, (err, data) => {
            if (err) {
                return res.send({ auth: 'failed' })
            } else {
                next()
            }
        })
    } else {
        return res.send({ auth: 'failed' })
    }
}

module.exports.decode = (token) => {
    if (typeof token !== "undefined") {
        token = token.slice(7, token.length)
        return jwt.verify(token, secret, (err, data) => {
            if (err) {
                return null
            } else {
                return jwt.decode(token, { complete: true }).payload
            }
        })
    } else {
        return null
    }
}