const express = require("express")
const Router = express.Router();
const Auth = require("../Models/Authmodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()





//Register API

Router.post("/register", async (req, res) => {
    const { firstname, lastname, email, phone, password } = req.body;

    if (!firstname || !lastname || !email || !phone || !password) {
        return res.json({ "msg": "All fields are mandatory" })
    }


    const checkUser = await Auth.findOne({ email });

    if (checkUser) {
        return res.json({ "msg": "User Already Registered with this Email Address" })
    }

    else {
        const hashedpassword = await bcrypt.hash(password, 10)
        const createUser = await Auth.create({
            firstname,
            lastname,
            email,
            phone,
            password: hashedpassword
        });

        if (createUser) {
            return res.json({ "msg": "Registed successfully!" })
        }

        else {
            return res.json({ "msg": "Failed to create an Account" })
        }
    }
})


//Login API

Router.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ "msg": "All fields are mandatory" })
    }

    const checkUser = await Auth.findOne({ email });

    if (checkUser && await (bcrypt.compare(password, checkUser.password))) {

        const token = await jwt.sign({
            userId: checkUser._id
        }, process.env.SECRETE_KEY)
        return res.status(201).cookie("Token", token).json({ "msg": "Logged In Successfully!" })
    }

    else {
        return res.status(400).json({ "msg": "Invalid email or password" })
    }
})

Router.post("/logout", async (req, res)=>{
 const clearcooke = await res.clearCookie("Token");

if (clearcooke) {
    return res.status(200).send("Logged out ")
}
else {
    res.status(400).send("Failed to logout")
}
})

module.exports = Router