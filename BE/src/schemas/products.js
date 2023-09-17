import Joi from "joi";

export const ProductSchema = Joi.object({
    _id: Joi.string(),
    book_name: Joi.string().required().messages({
        "string.empty": "Tên sách bắt buộc nhập",
        "any.required": "Trường tên sách bắt buộc nhập"
    }),
    book_author: Joi.string().required().messages({
        "string.empty": "Tên tác giả bắt buộc nhập",
        "any.required": "Trường tên tác giả bắt buộc nhập"
    }),
    book_price: Joi.number().required().messages({
        "number.empty": "Giá sản phẩm bắt buộc nhập",
        "any.required": "Trường giá sản phẩm bắt buộc nhập",
        "number.base": "Giá sản phẩm phải là số"
    }),
    book_image: Joi.object().required().messages({
        "any.required": "Trường ảnh sản phẩm bắt buộc nhập"
    }),
    sold_quantity: Joi.number(),
    book_description: Joi.string(),
    book_quantity: Joi.number().required().messages({
        "number.empty": "Số lượng tồn kho bắt buộc nhập",
        "any.required": "Trường Số lượng tồn kho bắt buộc nhập",
        "number.base": "Số lượng tồn kho sản phẩm phải là số"
    }),
    categoryId: Joi.string().required().messages({
        "string.empty": "Danh mục sản phẩm bắt buộc nhập",
        "any.required": "Trường danh mục sản phẩm bắt buộc nhập",
        "string.base": "Danh mục sản phẩm phải là chuỗi"
    }),
    brandId: Joi.string().required().messages({
        "string.empty": "Thương hiệu bắt buộc nhập",
        "any.required": "Trường Thương hiệu bắt buộc nhập",
        "string.base": "Thương hiệu phải là sản phẩm"
    }),
})