const Mongoose = require("mongoose");
const {Schema}=Mongoose

const adminSchema=new Schema({
    email:String,
    password:String,
    fullName:String
})

module.exports=Mongoose.model("Admin",adminSchema)