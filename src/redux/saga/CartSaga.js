import {put, call, takeEvery} from 'redux-saga/effects';
import Request from '../../apiServices/Request';
import {
  createOrderSuccess,
  setCreateOrderError,
  setCreateOrderLoader,
} from '../actions/CartActions';
import {CREATE_ORDER} from '../Types/CartActionTypes';

// ====================== Sign-Up POST ======================
function* createOrder({payload}) {
  let data = payload;
  yield put(setCreateOrderLoader(true));
  yield put(setCreateOrderError(''));
  try {
    const response = yield call(Request, {
      url: '/order/createOrder',
      method: 'POST',
      data,
    });

    if (response?.error) {
      yield put(setCreateOrderLoader(false));
      yield put(setCreateOrderError(response?.message));
      global.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        response?.message,
      );
    } else {
      yield put(setCreateOrderLoader(false));
      yield put(setCreateOrderError(''));
      yield put(createOrderSuccess());
    }
  } catch (e) {
    yield put(setCreateOrderLoader(false));
    yield put(setCreateOrderError(e.message));
  }
}

export function* cartSaga() {
  yield takeEvery(CREATE_ORDER, createOrder);
}
export default cartSaga;
