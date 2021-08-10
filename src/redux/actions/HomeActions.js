
import {
        OFFER_CARD_REQUEST,SEARCH_REQUEST,RESTRO_LIST_REQUEST,ORDER_DETAILS_REQUEST,SET_HUNGRY_NOW_LIST_LOADER,
        ADD_FAVOURITE_REQUEST,SET_FAVOURITE_LOADER,COUPON_REQUEST,HUNGRY_NOW_LIST_REQUEST
    } from '../Types/type';



// ================= Hungry Now Product List REQUEST =================
export const hungryNowListRequest = (data) => {
  
    return {
        type: HUNGRY_NOW_LIST_REQUEST,
        payload: data,
       
    };
}

// ================= Hungry Now Product List REQUEST =================
export const hungryNowListLoader = (data) => {
    
    
    return {
        type: SET_HUNGRY_NOW_LIST_LOADER,
        payload: data,
       
    };
   
}

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

// ================= Offer-Card REQUEST =================
export const offercardRequest = (data) => {
    
    return {
        type: OFFER_CARD_REQUEST,
        data,
       
    };
}

// ================= Offer-Card REQUEST =================
export const orderDetailsRequest = (data) => {
    
    return {
        type: ORDER_DETAILS_REQUEST,
        data,
       
    };
}

// ================= Add-Favourite REQUEST =================

export const addfavouriteRequest = (data, callback = false) => {return {type: ADD_FAVOURITE_REQUEST,data, callback}}
export const setFavouriteLoader  = (data) => {return {type: SET_FAVOURITE_LOADER,data,}}