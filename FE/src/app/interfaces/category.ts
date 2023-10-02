export interface ICategory {
    _id?: string,
    category_name?: string,
    category_image?: IImage | any
}
export interface IImage {
    url: string;
    publicId: string;
}