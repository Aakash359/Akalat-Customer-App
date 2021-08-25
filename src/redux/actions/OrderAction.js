import {
  ORDER_LIST,
  ORDER_LIST_SUCCESS,
  SET_ORDER_LIST_ERROR,
  SET_ORDER_LIST_LOADER,
} from '../Types/OrderActionTypes'

export const orderList = (payload,) => {
  return {
    type: ORDER_LIST,
    payload,
  }
}

export const setOrderListLoader = (payload) => {
  return {
    type: SET_ORDER_LIST_LOADER,
    payload,
  }
}

export const setOrderListError = (payload) => {
  return {
    type: SET_ORDER_LIST_ERROR,
    payload,
  }
}

export const orderListSuccess = (payload) => {
  return {
    type: ORDER_LIST_SUCCESS,
    payload,
  }
}
