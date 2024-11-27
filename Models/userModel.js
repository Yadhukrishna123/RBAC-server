const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullName:
    {
        type: String,
        required: true

    },
    email:
    {
         type: String,
        required: true
    },
    password:
    {
       type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Client', 'Viewer',"Super admin", ],
        
    },



})

module.exports = mongoose.model("Users", userSchema)