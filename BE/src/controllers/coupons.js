import Coupon from "../models/coupons.js"
import { CouponSchema } from "../schemas/coupons.js"
import Order from "../models/orders.js"
import Cart from '../models/cart.js'


export const createCoupons = async (req, res) => {
    try {
        const formDataCoupon = req.body
        const { error } = CouponSchema.validate(formDataCoupon, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const coupon = await Coupon.create(formDataCoupon)
        if (!coupon) {
            return res.status(404).json({
                error: "Tạo phiếu giảm giá thất bại"
            })
        }
        return res.status(200).json({
            message: "Tạo phiếu giảm giá thành công",
            coupon
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export const getOneCoupons = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) {
            return res.status(404).json({
                message: "Lấy 1 phiếu giảm giá thất bại"
            })
        }
        return res.status(200).json({
            message: "Lấy 1 phiếu giảm giá thành công",
            coupon
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export const getAllCoupons = async (req, res) => {
    try {
        const coupon = await Coupon.find();
        if (!coupon) {
            return res.status(404).json({
                message: "Lấy tất cả phiếu giảm giá thất bại"
            })
        }
        return res.status(200).json({
            message: "Lấy tất cả phiếu giảm giá thành công",
            coupon
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export const removeCoupons = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) {
            return res.status(404).json({
                message: "Xóa phiếu giảm giá thất bại"
            })
        }
        return res.status(200).json({
            message: "Xóa phiếu giảm giá thành công!",
            coupon
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export const updateCoupons = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const { error } = CouponSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const coupon = await Coupon.findByIdAndUpdate(id, body, { new: true })
        if (!coupon) {
            return res.status(404).json({
                message: "Cập nhật phiếu giảm giá thất bại"
            })
        }
        return res.status(200).json({
            message: "Cập nhật phiếu giảm giá thành công",
            updateCouponsSuccess: coupon
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const getCouponByUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const coupons = await Coupon.find();
        if (!coupons) {
            return res.status(404).json({
                message: "Lấy tất cả phiếu giảm giá thất bại"
            });
        }

        const userOrders = await Order.find({ userId: userId });
        const userCarts = await Cart.find({ userId: userId });
        const validCoupons = coupons.filter(coupon => {
            const notExpired = coupon.expiration_date > new Date(); // Kiểm tra hạn sử dụng
            const notUsedUp = coupon.coupon_quantity > 0; // Kiểm tra số lượng tồn
            const totalMin = coupon.min_purchase_amount < userCarts[0].total
            return notExpired && notUsedUp && totalMin;
        });

        userOrders.forEach(order => {
            if (order.couponId) {
                const usedCoupon = validCoupons.find(c => c._id.toString() === order.couponId.toString());
                if (usedCoupon) {
                    const index = validCoupons.indexOf(usedCoupon);
                    if (index !== -1) {
                        validCoupons.splice(index, 1);
                    }
                }
            }
        });

        return res.status(200).json({
            message: "Lấy phiếu giảm giá thành công",
            validCoupons
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};