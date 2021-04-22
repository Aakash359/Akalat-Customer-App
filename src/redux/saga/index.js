import { all } from 'redux-saga/effects';
import authSaga from './AuthSaga';
// import homeSaga from './HomeSaga';
// import settingSaga from './SettingSaga';

//Main Root Saga
const rootSaga = function* rootSaga() {

  //When Saga is Single then you can call like this
  // yield AuthSaga()
  //if sagas are multiple then you can call like this
  yield all([
    authSaga(),
    // homeSaga(),
    // commonSaga(),
    // settingSaga(),
  ])

};
export default rootSaga;