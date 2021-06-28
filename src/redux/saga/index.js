import {all} from 'redux-saga/effects'
import authSaga from './AuthSaga'
import settingSaga from './SettingSaga'
import homeSaga from './HomeSaga'
import cartSaga from './CartSaga'
import orderSaga from './OrderSaga'
import couponSaga from './CouponSaga'

const rootSaga = function* rootSaga() {
  yield all([authSaga(), settingSaga(), homeSaga(), cartSaga(), orderSaga(),couponSaga()])
}
export default rootSaga
