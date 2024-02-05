const express = require("express")
const router = express.Router()
const {
    login_user, singnup_user,
} = require('../controllers/userController')
const bcrypt = require("bcrypt")
const validator = require("validator")
const User = require('../models/userModel')



router.post("/login", async  (req, res) => {
    const { email, password } = req.body
    try {
        // const user = await User.login(email, password)    //the user we returned is stored here so we have assces to it
        if (!email || !password) {
            throw Error("All fields must be filled")
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw Error("Incorrect email")
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw Error("Incorrect password")
        }
        if (match) {
            const token = user._id              //when we get a user we create a token and we store that inside the token const
            // const token = createToken(user._id)              //when we get a user we create a token and we store that inside the token const
            res.status(200).json({ email, token, user })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

})

//sign-up route
router.post("/signup", singnup_user)


module.exports = router;


// router.post("/login", login_user)
