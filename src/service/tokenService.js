import jwt_decode from "jwt-decode";

const AUTH_TOKEN = 'token';

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
}

export const setToken = (token) => {
    if(token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
}

export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
}

export const decodeToken = (token) => {
    var decoded = jwt_decode(token);
    return decoded;
}