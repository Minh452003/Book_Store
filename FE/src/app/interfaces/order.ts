export interface Product {
    productId?: string;
    product_name?: string;
    product_price?: number;
    image: any;
    stock_quantity?: number;
}

export interface IOrder {
    _id?: string;
    userId?: string;
    products?: Product[];
    total?: number;
    status?: any;
    address?: string;
    phone?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}
