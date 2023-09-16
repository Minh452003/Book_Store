import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const productsSchema = mongoose.Schema({
    book_name: {
        type: String,
        require: true,
    },
    book_author: {
        type: String,
        require: true,
    },
    book_price: {
        type: Number,
        required: true
    },
    book_image: {
        type: Object,
        required: true
    },
    sold_quantity: {
        type: Number,
        default: 0
    },
    book_quantity: {
        type: Number,
        required: true
    },
    book_description: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    brandId: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
    }
},
    { timestamps: true, versionKey: false });
productsSchema.plugin(mongoosePaginate);
productsSchema.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

export default mongoose.model("Product", productsSchema);