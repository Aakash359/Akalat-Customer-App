import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
    } from '../Types/type';

// ================= LOGIN_REQUEST =================
export const loginRequest = (params) => {
    
    return {
        type: LOGIN_REQUEST,
        params
    };
}

