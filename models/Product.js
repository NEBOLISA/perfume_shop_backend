import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 }, // Star rating between 1 and 5
      title: { type: String, required: true },
      description: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true },
    quantity: { type: Number, },
    pictures: { type: [String], },
    inStock:{type:Boolean},
    price:{type:Number},
    description:{type:String},
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
},{timestamps:true})

const Product = mongoose.model("Product", ProductSchema)

export default Product