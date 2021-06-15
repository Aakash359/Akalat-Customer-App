import { ADD_TO_CART, SUB_TO_CART } from "../Types/CartActionTypes"

export const addToCart = (payload) => {
    return ({type: ADD_TO_CART, payload})
}

export const subToCart = (payload) => {
    return ({type: SUB_TO_CART, payload})
}