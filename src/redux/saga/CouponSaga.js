import {put, call, takeEvery} from 'redux-saga/effects'
import Request from '../../apiServices/Request'
import {
  setApplyCouponLoader,
  setApplyCouponError,
  applyCouponSuccess,
  setCouponCode,
} from '../actions/CouponActions'
import {APPLY_COUPON} from '../Types/ApplyCouponTypes'

// ====================== Sign-Up POST ======================
function* applyCoupon({payload}) {
  let data = payload
  yield put(setApplyCouponLoader(true))
  yield put(setApplyCouponError(''))
  try {
    const response = yield call(Request, {
      url: '/applyCoupon',
      method: 'POST',
      data,
    })
    console.log('====================================')
    console.log('couponResponse', response)
    console.log('====================================')
    if (response?.error) {
      yield put(setApplyCouponLoader(false))
      yield put(setApplyCouponError(response?.message))
      global.dropDownAlertRef.alertWithType('error', 'Error', response?.message)
    } else {
      yield put(setApplyCouponLoader(false))
      yield put(setApplyCouponError(''))
      yield put(applyCouponSuccess(response.data))
      yield put(setCouponCode(data.coupon_code))
    }
  } catch (e) {
    yield put(setApplyCouponLoader(false))
    yield put(setApplyCouponError(e.message))
  }
}

export function* couponSaga() {
  yield takeEvery(APPLY_COUPON, applyCoupon)
}
export default couponSaga
