import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    }
});

const Product =  mongoose.model('Product', productSchema);

export default Product;