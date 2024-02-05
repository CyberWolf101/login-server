const User = require('../models/userModel')
const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")              //this package(npm install jsonwebtoken) will help us generate tokens.A token is what tells the frontend if a user is authenticated or not so we can do something with that info

const createToken = (id) => {                   // we are creating a function so we can reuse it elsewhere(ie login_user controller and signup user contoller). we take in an argument id cus we will grab it from the req body when we call the fuction and and a user is assigned an id(we just called it id here)
    // return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "3d" })    //.sign is a method of jsonwebtoken used to create and asign a token. we pass in 3 arguments. first is the id to identify a user, second is a secret string that will be only known to the server and we put that in an env file. third argument can be an option and we use the expiresIn option that is to say it will expire in 3days

    console.log(id)
}                                                                         // and we need to return it so when we call it, it will return a token for us






//login user
const login_user = async (req, res) => {
    const { email, password } = req.body

    try {
        // const user = await User.login(email, password)    //the user we returned is stored here so we have assces to it
        if (!email || !password) {                          
            throw Error("All fields must be filled")        
        }
        const user = await this.findOne({ email })
        if (!user) {                                                    
            throw Error("Incorrect email")
        }                                                        
        const match = await bcrypt.compare(password, user.password)       
        if (!match) {                                           
            throw Error("Incorrect password")
        }
       if(match){
        const token = user._id              //when we get a user we create a token and we store that inside the token const
        // const token = createToken(user._id)              //when we get a user we create a token and we store that inside the token const
        res.status(200).json({ email, token, user })
       }
       
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }



}
//sign-up user
const singnup_user = async (req, res) => {
    const { email,
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
        followers,
    } = req.body

    try {
        const user = await User.signup(email, password, sex, bio, joined, dpUrl, firstName, userName, lastName, notifications)
        // const token = createToken(user._id)
        const token = user._id
        res.status(200).json({ email, token, user })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    singnup_user, login_user,
}











