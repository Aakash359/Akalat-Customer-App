import { ActionSheet } from 'native-base'
import {
  APPLY_COUPON_SUCCESS,
  REMOVE_COUPON,
  SET_APPLY_COUPON_ERROR,
  SET_APPLY_COUPON_LOADER,
  SET_COUPON_CODE,
} from '../Types/ApplyCouponTypes'

const initialState = {
  applyCoupon: null,
  isLoading: false,
  error: '',
  couponCode: '',
 
}

export default function couponReducer(state = initialState, {type, payload}) {
  switch (type) {
    case SET_APPLY_COUPON_LOADER:
      return {...state, isLoading: payload}
    case SET_APPLY_COUPON_ERROR:
      return {...state, error: payload,}
    case APPLY_COUPON_SUCCESS:
      return {...state, applyCoupon: payload, }
    case SET_COUPON_CODE:
      return {...state, couponCode: payload, }
    case REMOVE_COUPON:
      return {...state, couponCode: '', applyCoupon: null,}
    default:
      return state
  }
}
