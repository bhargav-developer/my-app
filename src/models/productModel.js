import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String,enum: ["Men","Women","Kids"], required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageLink: { type: String, required: false }, 
});

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
