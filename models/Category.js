const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const categorySchema = new Schema({
  name: String,
  isActive: {type: Boolean, default: true}
});
 
module.exports=Mongoose.model("Category",categorySchema)