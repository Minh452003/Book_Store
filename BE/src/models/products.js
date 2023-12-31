import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const productsSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    sold_quantity: {
        type: Number,
        default: 0
    },
    stock_quantity: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    author: {
        type: String,
        require: true,
    },
},
    { timestamps: true, versionKey: false });
productsSchema.plugin(mongoosePaginate);
productsSchema.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

export default mongoose.model("Product", productsSchema);