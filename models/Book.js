const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const bookSchema = new Schema({
  category: {
    type: Mongoose.Types.ObjectId,
    ref: "Category",
  },
  subCategory: {
    type: Mongoose.Types.ObjectId,
    ref: "SubCategory",
  },
  bookName: String,
  authorName: String,
  publisher: String,
  amount: Number,
  image: String,
  stock: {type: Number, default: 0},
  isActive: {type: Boolean, default: true}
});

module.exports = Mongoose.model("Book", bookSchema);
