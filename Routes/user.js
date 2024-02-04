const express = require("express")
const router = express.Router()
const {
    login_user, singnup_user,
    } = require('../controllers/userController')

// const User = require('../models/userModel')



router.post("/login", login_user)

//sign-up route
router.post("/signup", singnup_user)


module.exports = router;