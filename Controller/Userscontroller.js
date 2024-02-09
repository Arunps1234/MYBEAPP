const express = require("express");
const Router = express.Router();
const User = require("../Models/UserModels")
const Auth = require("../Models/Authmodel")
const jwt = require("jsonwebtoken");
require("dotenv").config()

// CreateUser
Router.post("/create", async (req, res)=>{
    const {firstname, lastname, email, phone, gender, userEmail} = req.body;

    const token = await req.cookies.Token;
    const verifyToKen = await jwt.verify(token, process.env.SECRETE_KEY)
    const Userid = verifyToKen.userId
    const getUsername = await Auth.findOne({_id:Userid});
    const Usersemail = getUsername.email


    if (!firstname || !lastname || !email || !phone || !gender) {
        return res.json({"msg":"All fields are mandatory"})
    }

    const checkUser = await User.find({            userEmail: Usersemail}).findOne({email});

    if (checkUser) {
        return res.status(400).json({"msg":"User already in the list"})
    }

    else {

        const createUser = await User.create({
            firstname,
            lastname,
            email,
            phone,
            gender,
            userEmail: Usersemail
    
        });

        if(createUser) {
            res.json({"msg":"User created successfully" })
        }

        else {
            return res.json({"msg":"Failed to create an user"})
        }
    }
})

//getUser
Router.get("/getUsers", async(req, res)=>{

    const token = req.cookies.Token;
    const verifyToKen = await jwt.verify(token, process.env.SECRETE_KEY)
    const Userid = verifyToKen.userId
    const getUsername = await Auth.findOne({_id:Userid});
    const Usersemail = getUsername.email 


    const getAllUsers = await User.find({userEmail:Usersemail });

    if(getAllUsers) {
        return res.json(getAllUsers)
    }

    else {
        return res.json({"msg":"Failed to get user details"})
    }
})

//deleteUser

Router.delete("/delete/:id", async (req, res)=>{
const uid = req.params.id;

const deleteUser = await User.findByIdAndDelete(uid);

if(deleteUser) {
    return res.json({"msg":"User Deleted Successfully"})
}
else {
    return res.json({"msg":"Failed to delete User"})
}
})

//getSignleuser

Router.get("/getUser/:id", async (req, res)=>{

    const uid = req.params.id
    const getUser = await User.findById(uid);

    if(getUser) {
        return res.json(getUser)
    }

    else {
        return res.json({"msg":"Failed to get user"})
    }
})


// updateUser

Router.put("/update/:id", async(req, res)=>{
    const uid = req.params.id;

    const updateUser = await User.findByIdAndUpdate(uid, req.body);

    if(updateUser) {
        res.json(updateUser)
    }

    else {
        res.json({"msg":"Failed to update the user"})
    }
})

module.exports = Router