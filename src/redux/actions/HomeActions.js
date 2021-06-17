
import {
        OFFER_CARD_REQUEST,SEARCH_REQUEST,RESTRO_LIST_REQUEST,
        RESTRO_ITEM_REQUEST,ADD_FAVOURITE_REQUEST,SET_FAVOURITE_LOADER
    } from '../Types/type';


// ================= Offer-Card REQUEST =================
export const searchRequest = (data) => {
    
    return {
        type: SEARCH_REQUEST,
        payload: data,
       
    };
}

// ================= Coupon Card REQUEST =================
export const couponRequest = (data) => {
    
    return {
        type: COUPON_REQUEST,
        data,
       
    };
}

// ================= Coupon Card REQUEST =================
export const restroListRequest = (data) => {
    
    return {
        type: RESTRO_LIST_REQUEST,
        data,
       
    };
}

// ================= Restro Item REQUEST =================
export const restroItemRequest = (data) => {
    
    return {
        type: RESTRO_ITEM_REQUEST,
        data,
       
    };
}



// ================= Offer-Card REQUEST =================
export const offercardRequest = (data) => {
    
    return {
        type: OFFER_CARD_REQUEST,
        data,
       
    };
}

// ================= Add-Favourite REQUEST =================

export const addfavouriteRequest = (data) => {return {type: ADD_FAVOURITE_REQUEST,data,}}
export const setFavouriteLoader  = (data) => {return {type: SET_FAVOURITE_LOADER,data,}}