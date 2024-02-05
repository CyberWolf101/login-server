const express = require("express")
const router = express.Router()
const {
    login_user, singnup_user,
} = require('../controllers/userController')
const bcrypt = require("bcrypt")
const validator = require("validator")
const User = require('../models/userModel')



router.post("/login", async (req, res) => {
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

router.post("/signup", async (req, res) => {

    const {
        email,
        password,
        sex,
        bio,
        joined,
        dpUrl,
        firstName,
        userName,
        lastName,
        notifications,
        balance,
        likes,
        followers
    } = req.body
    try {
        if (!email || !password) {                           //checking if email & password have a value
            throw Error("All fields must be filled")        //we could also do all this in the controller file
        }
        if (!validator.isEmail(email)) {                         //this method checks if the value is an email and we pass in the email (the .isEmail() is a method)
            throw Error("Email is not valid!")    //we return errors so the rest of the code will not execute and cause the app to break
        }

        if (password.length < 8) {
            throw Error("Password must contain atleast 8 characters")
        }
        //Code to run after validation
        const exists = await User.findOne({ email })
        if (exists) {                                         //checking if the email exist already,i know it's already done in the schema but we want to send back a custom err response.
            throw Error("email already in use!")            //so if the const above(exists) has a value, we throw error cus we cant say res.send
        }                                                   //so at this point everything is okay and we want to save the email and password to the db. we install a package called bcrypt (npm install bcrypt) so our password can be save in an hash(#) format
        const salt = await bcrypt.genSalt(10)              //using salt enables identicall passwords to have differnt hashing sequences..and it prevents password matching by hackers. the value we passed is the password length. the longer it is, the harder it is to crack.
        const hash = await bcrypt.hash(password, salt)    //this takes in two arguments first is the pain text password the user wants to use to sign up and the second on is the salt value

        const user = await User.create({ email, password: hash, sex, bio, joined, dpUrl, firstName, userName, lastName, notifications, balance, likes, followers })
        const token = user._id
        res.status(200).json({ email, token, user })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router;

// router.post("/signup", singnup_user)

// router.post("/login", login_user)
