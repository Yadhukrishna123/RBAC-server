const mongoose = require("mongoose")

const roleSchema = mongoose.Schema({
    roleName:{
        type: String,
        required: true,
        unique: true
    },
    permission: {
        type: [String],
         default: [] 
    }
})

module.exports = mongoose.model("role", roleSchema)