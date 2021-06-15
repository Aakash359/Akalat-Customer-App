import { all } from 'redux-saga/effects';
import authSaga from './AuthSaga';
import settingSaga from './SettingSaga';
import homeSaga from './HomeSaga'

const rootSaga = function* rootSaga() {
  
  yield all([
    authSaga(),
    settingSaga(),
    homeSaga(),
    // commonSaga(),
 
  ])

};
export default rootSaga;