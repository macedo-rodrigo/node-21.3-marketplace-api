const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      trim: true,
      require: true,
    },
    status: {
      type: String,
      enum: ["new", "used"], // this will limit the accepted values to "new" or "used".
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
