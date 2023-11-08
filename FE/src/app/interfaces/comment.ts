export interface IComment {
    _id?: string
    id?: string
    userId?: string | any
    productId?: string
    description?: string
    rating?: number
    formattedCreatedAt?: string
}