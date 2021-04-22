import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
    } from '../Types/type';
import { put, call, takeEvery } from 'redux-saga/effects';
import Request from '../../apiServices/Request'; 

// ====================== login ======================
export const loginSaga = function* loginSaga({params} ) {
    let data = params
    try {
        const response = yield call(Request, {
            url: 'driver/driverDetail',
            method: 'POST',
            data,
          })
          if (response?.data?.error == true){
            yield put({ type: LOGIN_FAILURE, payload: response  });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
              response?.data?.message,
            );
          }
       else{ 
           yield put({ type: LOGIN_SUCCESS, payload: response });
        }
        
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: LOGIN_FAILURE, payload: e });
    }
}

export function* authSaga() {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
}
export default authSaga;