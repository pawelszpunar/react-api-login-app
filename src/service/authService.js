import { removeToken } from "./tokenService";
import { decodeToken } from "./tokenService";
import { getToken } from "./tokenService";

export const getUser = () => {
    try {
        const token = getToken();
        console.log(token);
        return decodeToken(token)
    } catch(e) {
        return null;
    }
}

export const logout = () => {
    removeToken();
}