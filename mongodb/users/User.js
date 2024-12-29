const mongoose = require("../conect-db")

const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    
    email:{
        type: String
    }, 
    
    password:{
        type: String
    }
})

mongoose.model("users", UserSchema)

module.exports = mongoose.model("users")