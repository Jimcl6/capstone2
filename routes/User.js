const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const auth = require('../auth');

router.post("/checkEmail", (req, res) => {
    userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController))
})


router.put('/:id'), auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)
    if (userData.isAdmin == true) {
        userController.makeAdmin(req.body).then(resultFromController => res.send(resultFromController))
    } else {
        res.send(`Logged in account is not an admin.`)
    }

}

router.post('/login', (req, res) => {
    userController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
})

router.post('/register', auth.verify, (req, res) => {
    const userData = auth.decode(req.heades.authorization)
    if (userData.isAdmin == true) {
        userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
    } else {
        res.send(`Logged in account is not an admin.`)
    }

})

/* orders and products */

module.exports = router;