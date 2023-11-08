import Comment from "../models/comments.js";
import { CommentSchema } from "../schemas/comments.js";
import Product from "../models/products.js";
import Auth from "../models/auth.js";

export const getCommentFromProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const comments = await Comment.find({ productId: productId }).populate({
            path: 'userId',
            select: 'full_name email avatar',
        });
        if (!comments || comments.length === 0) {
            return res.status(404).json({
                message: 'Không tìm thấy theo sản phẩm bình luận',
            });
        }

        const formattedComments = comments.map(comment => ({
            _id: comment._id,
            userId: comment.userId,
            productId: comment.productId,
            description: comment.description,
            formattedCreatedAt: comment.formattedCreatedAt,
        }));

        return res.status(200).json({
            message: 'Lấy bình luận theo sản phẩm thành công',
            comments: formattedComments,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};


export const getOneComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                message: 'Không tìm thấy bình luận',
            });
        }
        return res.status(200).json({
            message: "Lấy thành công 1 bình luận",
            comment,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export const create = async (req, res) => {
    try {
        const { userId, rating, description, productId } = req.body;
        const { error } = CommentSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        if (!userId) {
            return res.status(401).json({
                message: "Bạn phải đang nhập mới được đánh giá sản phẩm!",
            });
        }
        // Check if the product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Sản phẩm không tồn tại.",
            });
        }
        // Check if the user exists
        const user = await Auth.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "Người dùng không tồn tại.",
            });
        }

        // Check if the user already reviewed the product
        const existingComment = await Comment.findOne({ userId, productId });

        if (existingComment) {
            return res.status(401).json({
                message: "Bạn đã đánh giá sản phẩm này trước đó.",
            });
        }
        const user_fullName = user?.user_fullName;
        const user_avatar = user?.user_avatar;
        const comment = await Comment.create({
            user_fullName,
            user_avatar,
            userId,
            rating,
            description,
            productId,
        });
        const comments = await Comment.find({ productId });
        const totalRating = comments.reduce(
            (totalRating, rating) => totalRating + rating.rating,
            0
        );
        // Tính toán số lượng sao và lươtj đánh giá
        const reviewCount = comments.length;
        const averageScore = totalRating / reviewCount;

        product.average_score = Math.round(averageScore);
        product.review_count = reviewCount;
        await product.save();
        if (user) {
            return res.status(200).json({
                message: "Bạn đã đánh giá thành công sản phẩm này!",
                success: true,
                comment,
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}


export const updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { error } = CommentSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const comment = await Comment.findByIdAndUpdate(id, body, { new: true });
        return res.status(200).json({
            message: 'Cập nhật bình luận thành công',
            comment
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}


export const removeComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'Xóa comment thành công',
            comment
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}


export const getAllComment = async (req, res) => {
    try {
        const products = await Comment.aggregate([
            {
                $group: {
                    _id: '$productId',
                    count: { $sum: 1 }, // Đếm số lượng bình luận cho mỗi sản phẩm
                },
            },
            {
                $lookup: {
                    from: 'products', // Tên của bảng sản phẩm
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productInfo',
                },
            },
            {
                $unwind: '$productInfo',
            },
            {
                $project: {
                    _id: '$productInfo._id',
                    product_name: '$productInfo.product_name',
                    ratings_count: '$productInfo.ratings_count',
                    comments_count: '$count',
                },
            },
        ]);

        return res.status(200).json({
            message: 'Lấy tất cả sản phẩm đã được đánh giá và số lượng đánh giá thành công',
            products,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};