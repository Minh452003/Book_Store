import Joi from "joi";

export const ProductSchema = Joi.object({
    _id: Joi.string(),
    product_name: Joi.string().required().messages({
        "string.empty": "Tên sản phẩm bắt buộc nhập",
        "any.required": "Trường tên sản phẩm bắt buộc nhập"
    }),
    product_price: Joi.number().required().messages({
        "number.empty": "Giá sản phẩm bắt buộc nhập",
        "any.required": "Trường giá sản phẩm bắt buộc nhập",
        "number.base": "Giá sản phẩm phải là số"
    }),
    image: Joi.object().required().messages({
        "any.required": "Trường ảnh sản phẩm bắt buộc nhập"
    }),
    sold_quantity: Joi.number(),
    description: Joi.string(),
    stock_quantity: Joi.number().required().messages({
        "number.empty": "Số lượng tồn kho bắt buộc nhập",
        "any.required": "Trường Số lượng tồn kho bắt buộc nhập",
        "number.base": "Số lượng tồn kho sản phẩm phải là số"
    }),
    categoryId: Joi.string().required().messages({
        "string.empty": "Danh mục sản phẩm bắt buộc nhập",
        "any.required": "Trường danh mục sản phẩm bắt buộc nhập",
        "string.base": "Danh mục sản phẩm phải là chuỗi"
    }),
    author: Joi.string().required().messages({
        "string.empty": "Tên tác giả bắt buộc nhập",
        "any.required": "Trường tên tác giả bắt buộc nhập"
    }),
    views: Joi.number(),

})