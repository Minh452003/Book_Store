export interface IProduct {
    id?: string
    product_name?: string;
    product_price?: number;
    image?: {
        url?: string;
        publicId?: string;
    };
    stock_quantity?: number;
    sold_quantity?: number;
    views?: number;
    description?: string;
    categoryId?: string;
    author?: string;
    _id?: string;
    category?: string
}