const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const auth = require('../auth');

router.post("/checkEmail", (req, res) => {
    userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController))
})

/* setAsAdmin */
router.put('/:id/setAsAdmin', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)

    if (userData.isAdmin == false) {
        res.send(`User not Authorized.`)
    } else {
        courseController.makeAdmin(req.params, req.body).then(resultFromController => res.send(resultFromController))
    }
})

router.post('/login', (req, res) => {
    userController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
})

router.post('/register', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)
    if (userData.isAdmin == true) {
        userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
    } else {
        res.send(`Logged in account is not an admin.`)
    }

})

/* orders and products */

module.exports = router;