import jwt_decode from "jwt-decode";

export const getDecodedAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return jwt_decode(accessToken);
    }
    return null;
};
