import {put, call, takeEvery} from 'redux-saga/effects'
import Request from '../../apiServices/Request'
import {
  orderListSuccess,
  setOrderListError,
  setOrderListLoader,
} from '../actions/OrderAction'
import {ORDER_LIST} from '../Types/OrderActionTypes'

function* orderList({payload}) {
  let data = payload

  yield put(setOrderListError(''))
  yield put(setOrderListLoader(true))

  try {
    const response = yield call(Request, {
      url: '/order/orderList',
      method: 'POST',
      data,
    })
    if (response?.error) {
      yield put(setOrderListError(response?.message))
      global.dropDownAlertRef.alertWithType('error', 'Error', response?.message)
    } else {
      yield put(orderListSuccess(response?.data?.order_list))
    }
  } catch (e) {
    yield put(setOrderListError(e))
  }
}

export function* orderSaga() {
  yield takeEvery(ORDER_LIST, orderList)
}
export default orderSaga
