import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import SettingReducer from './SettingReducer'
import HomeReducer from './HomeReducer'
import CartReducer from './CartReducer'
import {DESTROY_SESSION, LOGOUT_REQUEST} from '../Types/type'
import OrderReducer from './OrderReducer'
import couponReducer from './CouponReducer'

const appReducer = combineReducers({
  Auth: AuthReducer,
  Setting: SettingReducer,
  Home: HomeReducer,
  Cart: CartReducer,
  order: OrderReducer,
  coupon:couponReducer
})
const rootReducer = (state, action) => {
  
  if (action.type === LOGOUT_REQUEST) {
    state = undefined
  }

  return appReducer(state, action)
}
export default rootReducer
