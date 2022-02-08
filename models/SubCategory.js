const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const subCategorySchema = new Schema({
  category: {
    type: Mongoose.Types.ObjectId,
    ref: "Category",
  },
  name: String,
  image: String,
  isActive: {type: Boolean, default: true},
  showInWebsite: {type: Boolean, default: false}
});

module.exports = Mongoose.model("SubCategory", subCategorySchema);
