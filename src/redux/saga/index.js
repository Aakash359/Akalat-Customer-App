import {all} from 'redux-saga/effects';
import authSaga from './AuthSaga';
import settingSaga from './SettingSaga';
import homeSaga from './HomeSaga';
import cartSaga from './CartSaga';

const rootSaga = function* rootSaga() {
  yield all([
    authSaga(),
    settingSaga(),
    homeSaga(),
    cartSaga(),
  ]);
};
export default rootSaga;
