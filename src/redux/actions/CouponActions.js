import {
  APPLY_COUPON,
  APPLY_COUPON_SUCCESS,
  REMOVE_COUPON,
  SET_APPLY_COUPON_ERROR,
  SET_APPLY_COUPON_LOADER,
  SET_COUPON_CODE,
} from '../Types/ApplyCouponTypes'

export const applyCoupon = (payload) => {
  return {
    type: APPLY_COUPON,
    payload,
  }
}

export const setApplyCouponLoader = (payload) => {
  return {
    type: SET_APPLY_COUPON_LOADER,
    payload,
  }
}

export const setApplyCouponError = (payload) => {
  return {
    type: SET_APPLY_COUPON_ERROR,
    payload,
  }
}
export const applyCouponSuccess = (payload) => {
  return {
    type: APPLY_COUPON_SUCCESS,
    payload,
  }
}
export const setCouponCode = (payload) => {
  return {
    type: SET_COUPON_CODE,
    payload,
  }
}
export const removeCoupon = (payload) => {
  return {
    type: REMOVE_COUPON,
    payload,
  }
}
