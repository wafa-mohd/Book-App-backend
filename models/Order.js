const  Mongoose  = require("mongoose");
const { Schema } = Mongoose;

const orderSchema = new Schema({
  book:  {
    type: Mongoose.Types.ObjectId,
    ref: "Book",
  },
  name: String,
  mobileNumber:Number,
  email:String,
  deliveryAddress: String,
  bookAmount:   Number,
  quantity:Number,
  totalAmount:Number,
  user: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum : ['pending','confirmed','out for delivery','delivered'],
    default: "pending"
},
});
 
module.exports=Mongoose.model("Order",orderSchema)