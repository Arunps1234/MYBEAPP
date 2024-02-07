const mongoose = require("mongoose");
require("dotenv").config()

mongoose.connect("mongodb+srv://psaruna748:VvtekotUot0DoARS@cluster0.hzs68mc.mongodb.net/mydatabase").then(res=>{
    console.log("Connected to database successfully!")
}).catch(err=>{
    console.log(err)
})