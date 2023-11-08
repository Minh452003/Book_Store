export interface IUser {
    user?: any
    _id?: number | string;
    full_name?: string;
    email?: string;
    password?: string
    confirmPassword?: string
    address?: string;
    avatar?: IImage | any;
    role?: string;
    googleId?: string;
    facebookId?: string;
    authType?: string;
    createdAt?: string;
    passwordResetToken?: string;
    passwordResetExpires?: string;
    passwordChangeAt?: string
}
export interface IImage {
    url: string;
    publicId: string;
}