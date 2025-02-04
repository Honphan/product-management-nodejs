const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
        { 
                title: String,
                description: String,
                category: String,
                price: Number,
                discountPercentage: Number,
                rating: Number,
                stock:  Number,
                deleted: Boolean,
                status: String,
                thumbnail: String 
});


const Product = mongoose.model("Product", ProductSchema, "products");

module.exports = Product;
