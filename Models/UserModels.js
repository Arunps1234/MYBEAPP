const mongoose = require("mongoose")

const UserModels = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    userEmail : {
        type : String,
    }
})

module.exports = mongoose.model("User", UserModels)