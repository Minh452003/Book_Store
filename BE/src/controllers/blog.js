import Blog from "../models/blog.js";
import { BlogSchema } from "../schemas/blog.js";


export const getAll = async (req, res) => {
    try {
        const data = await Blog.find()
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Blog.findById(id)

        if (!data) {
            return res.status(400).json({
                message: "Không tìm thấy bài viết",
            })
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};



export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = BlogSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const data = await Blog.create(body);
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm danh mục thất bại"
            })
        }
        return res.status(200).json({
            message: "Thêm danh mục thành công",
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const remove = async (req, res) => {
    try {
        const data = await Blog.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            message: "Xóa danh mụcthành công",
            data
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { error } = BlogSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const data = await Blog.findByIdAndUpdate({ _id: id }, body, {
            new: true,
        });
        if (data.length === 0) {
            return res.status(400).json({
                message: "Cập nhật danh mục thất bại",
            })
        }
        return res.status(200).json({
            message: "Cập nhật danh mục thành công",
            data,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}