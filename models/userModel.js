const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require("validator")
const cors = require("cors");


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    sex: {
        type: String,
        required: true
    },
    transactions: {
        type: Array,
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
    },
    followers: {
        type: [
            {
                userId: String,
                userName: String,
                userDpUrl: String
            }
        ],
        default: []
    },
    following: {
        type: [
            {
                userId: String,
                userName: String,
                userDpUrl: String
            }
        ],
        default: []
    },
    joined: {
        type: Number,
        required: true
    },
    dpUrl: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    followedShops: {
        type: Array,
        default: []
    },
})

// STATIC LOGIN FUNCTION
// userSchema.statics.login = async function (email, password) { 
//     if (!email || !password) {                          
//         throw Error("All fields must be filled")        
//     }
//     const user = await this.findOne({ email })
//     if (!user) {                                                    
//         throw Error("Incorrect email")
//     }                                                        
//     const match = await bcrypt.compare(password, user.password)       
//     if (!match) {                                           
//         throw Error("Incorrect password")
//     }
//     return user
// }
// userSchema.statics.signup = async function (
//     email,
//     password,
//     sex,
//     bio,
//     joined,
//     dpUrl,
//     firstName,
//     userName,
//     lastName,
//     notifications,
//     balance,
//     likes,
//     followers
// ) {     //we refernce the schema first and a method called statics then whatever name u want to give the method.NOTE we can't use arrow function with the "this" keyword
//     //VALIDATIONS 
//     if (!email || !password) {                           //checking if email & password have a value
//         throw Error("All fields must be filled")        //we could also do all this in the controller file
//     }
//     if (!validator.isEmail(email)) {                         //this method checks if the value is an email and we pass in the email (the .isEmail() is a method)
//         throw Error("Email is not valid!")    //we return errors so the rest of the code will not execute and cause the app to break
//     }
//     // if (!validator.isStrongPassword(password)) {                      //isStrongPassword is also a method all coming from the vallidator package we installed
//     //     throw Error("Password must cosist of atleast 8 characters, an uppercase letter, a number and atleast one special character(!#$*%)")
//     // }//Note, so far as you install validator, it will do this jobs but we just want to send a better error messsage

//     if (password.length < 8) {
//         throw Error("Password must contain atleast 8 characters")
//     }
//     //Code to run after validation
//     const exists = await this.findOne({ email })
//     if (exists) {                                         //checking if the email exist already,i know it's already done in the schema but we want to send back a custom err response.
//         throw Error("email already in use!")            //so if the const above(exists) has a value, we throw error cus we cant say res.send
//     }                                                   //so at this point everything is okay and we want to save the email and password to the db. we install a package called bcrypt (npm install bcrypt) so our password can be save in an hash(#) format
//     const salt = await bcrypt.genSalt(10)              //using salt enables identicall passwords to have differnt hashing sequences..and it prevents password matching by hackers. the value we passed is the password length. the longer it is, the harder it is to crack.
//     const hash = await bcrypt.hash(password, salt)    //this takes in two arguments first is the pain text password the user wants to use to sign up and the second on is the salt value

//     const user = await this.create({ email, password: hash, sex, bio, joined, dpUrl, firstName, userName, lastName, notifications, balance, likes, followers })  
// }












const User = mongoose.model("user", userSchema)
module.exports = User;
