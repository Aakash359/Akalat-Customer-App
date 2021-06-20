import {
  ORDER_LIST_SUCCESS,
  SET_ORDER_LIST_ERROR,
  SET_ORDER_LIST_LOADER,
} from '../Types/OrderActionTypes'

const initialState = {
  orderList: [],
  isLoading: false,
  error: '',
}

export default function orderReducer(state = initialState, {type, payload}) {
  switch (type) {
    case SET_ORDER_LIST_LOADER:
      return {...state, isLoading: payload}
    case SET_ORDER_LIST_ERROR:
      return {...state, error: payload}
    case ORDER_LIST_SUCCESS:
      return {...state, orderList: payload}
    default:
      return state
  }
}
