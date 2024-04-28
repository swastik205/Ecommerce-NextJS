import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    prodId: { type: Number, required: true, unique: true },
    slug: { type: Number, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String, required: true },
    size: [{ type: String }],
    color: { type: String },
    price: { type: Number },
    dprice: { type: Number },
    availableQty: { type: Number, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
const Product = mongoose.model("Product", ProductSchema);

export default Product;
