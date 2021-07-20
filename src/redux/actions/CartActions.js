import {
  ADD_TO_CART,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  RE_ORDER,
  SET_ADDRESS_ID,
  SET_CREATE_ORDER_ERROR,
  SET_CREATE_ORDER_LOADER,
  SET_INSTRUCTION,
  SET_SELECTED_ADDRESS,
  SUB_TO_CART,
} from '../Types/CartActionTypes'

export const addToCart = (payload) => {
  return {type: ADD_TO_CART, payload}
}

export const subToCart = (payload) => {
  return {type: SUB_TO_CART, payload}
}

export const setInstruction = (payload) => {
  return {type: SET_INSTRUCTION, payload}
}

export const setAddressId = (payload) => {
  return {type: SET_ADDRESS_ID, payload}
}

export const setSelectedAddress = (payload) => {
  return {type: SET_SELECTED_ADDRESS, payload}
}

export const createOrder = (payload, callback = null) => ({
  type: CREATE_ORDER,
  payload,
  callback,
})

export const setCreateOrderLoader = (payload) => ({
  type: SET_CREATE_ORDER_LOADER,
  payload,
})

export const setCreateOrderError = (payload) => ({
  type: SET_CREATE_ORDER_ERROR,
  payload,
})

export const createOrderSuccess = () => ({type: CREATE_ORDER_SUCCESS})

export const reOrder = (payload) => ({type: RE_ORDER, payload})
