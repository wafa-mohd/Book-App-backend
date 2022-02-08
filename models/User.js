const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName:  String,
  lastName: String,
  email:   String,
  password:String
});
 
module.exports=Mongoose.model("User",userSchema)