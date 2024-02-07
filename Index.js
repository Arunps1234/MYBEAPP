const express = require("express");
const app = express();
require("dotenv").config()
require("./Connection")
const Auth = require("./Controller/AuthController")
const User = require("./Controller/Userscontroller")
const cors = require("cors")
const cookieparser = require("cookie-parser")


// Middlarewares

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(cookieparser())




app.listen(5080, ()=>{
    console.log("Server is running at port 5080")
})

app.use("/API/Auth", Auth)
app.use("/API/User", User)




