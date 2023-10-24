import { IProduct } from "./product"

export interface InputCart {
    productId?: string
    product_name?: string
    product_price?: number
    image?: string
    stock_quantity?: number
}
export interface Icart {
    message: string
    data: {
        products?: IProduct[]
        total?: number
        userId?: string
        couponId?: string
    }
}