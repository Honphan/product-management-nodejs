const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug)

const ProductSchema = new mongoose.Schema(
        { 
                title: String,
                description: String,
                category: String,
                price: Number,
                discountPercentage: Number,
                rating: Number,
                stock:  Number,
                slug: { type: String, slug: "title" , unique : true},
                deleted: {
                        type: Boolean,
                        default: false
                },
                status: {
                        type: String,
                        default: "active"
                },
                thumbnail: String,
                deletedAt: Date,
                position: Number
},{
        timestamps: true
});


const Product = mongoose.model("Product", ProductSchema, "products");

module.exports = Product;
