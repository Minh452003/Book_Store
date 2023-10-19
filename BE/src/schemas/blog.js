import Joi from "joi";
export const BlogSchema = Joi.object({
    _id: Joi.string(),
    author: Joi.string().required().messages({
        "string.empty": "Tên danh mục không được để trống",
        "any.required": "Trường tên danh mục là bắt buộc",
    }),
    title: Joi.string().required().messages({
        "string.empty": "tiêu đề không được để trống",
        "any.required": "Trường title là bắt buộc",
    }),
    description: Joi.string(),
    image: Joi.object().required().messages({
        "string.empty": "Ảnh bắt buộc nhập",
        "any.required": "Trường ảnh bắt buộc nhập"
    }),
})