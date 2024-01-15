const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:String,
})

//define
const UserModel = mongoose.model("user",UserSchema)

module.exports = UserModel;