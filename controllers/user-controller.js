const user = require('../models/User');
const bcrypt = require('bcrypt')
const auth = require(`../auth`)
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

/* enroll user */

// Async await will be used in enrolling the user because we will need to update 2 seperate documents when enrolling a user.
/* module.exports.enroll = async(data) => {

    // using the "await" keywrd will allow the enroll method to complete updating the user before returning a response back.
    let isUserUpdated = await user.findById(data.userId).then(user => {
        user.enrollments.push({ courseId: data.courseId })

        return user.save().then((user, error) => {
            if (error) {
                return false
            } else {
                return true
            }
        })
    })

    // using the "await"keyword will allow the enroll method to complete the course before returning a response back.
    let isCourseUpdated = await course.findById(data.courseId).then(course => {
        // adds the userId in the course's enrollees array
        course.enrollees.push({ userId: data.userId });
        // save the updated course information information.
        return course.save().then((course, error) => {
            if (error) {
                return false
            } else {
                return true
            }
        })
    })

    // Condition that will check if the user and course documents have been updated
    // User enrollment is successful
    if (isUserUpdated && isCourseUpdated) {
        return true
    } else {
        // user enrollment failed.
        return false
    }
} */