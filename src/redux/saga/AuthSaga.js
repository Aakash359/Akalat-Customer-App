import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  OTP_REQUEST,
  OTP_SUCCESS,
  OTP_FAILED,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOADER_REQUEST,
  GET_USER_DETAILS,
  UPDATE_USER_DETAILS,
} from '../Types/type';
import {put, call, takeEvery, takeLatest} from 'redux-saga/effects';
import Request from '../../apiServices/Request';
import {OTPRequest} from '../actions';

// ====================== Sign-Up POST ======================
export const SignUpSaga = function* SignUpSaga({params}) {
  let data = params;
  // console.log("SingInParams=========>", data)
  try {
    const response = yield call(Request, {
      url: '/addUser',
      method: 'POST',
      data,
    });
    if (response?.error) {
      yield put({type: SIGNUP_FAILED, payload: response});
      yield put({type: LOADER_REQUEST, payload: false});
      global.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        response?.message,
      );
    } else {
      yield put({type: SIGNUP_SUCCESS, payload: response});
      yield put({type: LOADER_REQUEST, payload: false});
      yield put(
        OTPRequest({phone: data?.phone, role: 'customer', country_code: '91'}),
      );
    }
  } catch (e) {
    console.log(e, 'error');
    yield put({type: SIGNUP_FAILED, payload: e});
    yield put({type: LOADER_REQUEST, payload: false});
  }
};

// ====================== login Post ======================
export const loginSaga = function* loginSaga({data}) {
  console.log('Params=========>', data);
  try {
    const response = yield call(Request, {
      url: '/login',
      method: 'POST',
      data,
    });
    console.log('Error=========>', response?.data?.profile);
    if (response?.error == true) {
      yield put({type: LOGIN_FAILURE, payload: response});
      yield put({type: LOADER_REQUEST, payload: false});
      global.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        response?.message,
      );
    } else {
      yield put({type: LOGIN_SUCCESS, payload: response?.data?.profile});
      console.log('Params=========>', response?.data?.token);

      yield put({type: LOADER_REQUEST, payload: false});
    }
  } catch (e) {
    console.log(e, 'error');
    yield put({type: LOGIN_FAILURE, payload: e});
    yield put({type: LOADER_REQUEST, payload: false});
  }
};

function* getUserDetails({data}) {
  try {
    const response = yield call(Request, {
      url: '/userDetail',
      method: 'POST',
      data,
    });
    if (response?.error) {
      global.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        response?.message,
      );
    } else {
      yield put({type: UPDATE_USER_DETAILS, payload: response?.data});
    }
  } catch (e) {
    console.log(e, 'error');
  }
}

// ====================== OTP Send Post ======================
export const OtpSaga = function* OtpSaga({data}) {
  // console.log("OTP Params=========>", data)
  try {
    const response = yield call(Request, {
      url: '/sendOtp',
      method: 'POST',
      data,
    });
    // console.log("Error=========>", response)
    if (response?.error == true) {
      yield put({type: OTP_FAILED, payload: response});
      global.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        response?.message,
      );
    } else {
      yield put({type: OTP_SUCCESS, payload: response});
    }
  } catch (e) {
    console.log(e, 'error');
    yield put({type: OTP_FAILED, payload: e});
  }
};

// ====================== OTP Verify Post ======================
export const OtpVerifySaga = function* OtpVerifySaga({data}) {
  try {
    const response = yield call(Request, {
      url: '/verifyOtp',
      method: 'POST',
      data,
    });

    if (response?.error == true) {
      yield put({type: OTP_VERIFY_FAILED, payload: response});
      global.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        response?.message,
      );
    } else {
      yield put({type: OTP_VERIFY_SUCCESS, payload: response});
    }
  } catch (e) {
    console.log(e, 'error');
    yield put({type: OTP_VERIFY_FAILED, payload: e});
  }
};

// ====================== Log-Out Post ======================
export const logoutSaga = function* logoutSaga({data}) {
  console.log('Logout Params=========>', data);
  try {
    yield put({type: LOGOUT_SUCCESS});
  } catch (e) {
    console.log(e, 'error');
    yield put({type: LOGOUT_FAILED, payload: e});
  }
};

export function* authSaga() {
  yield takeEvery(SIGNUP_REQUEST, SignUpSaga);
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(OTP_REQUEST, OtpSaga);
  yield takeEvery(OTP_VERIFY_REQUEST, OtpVerifySaga);
  yield takeEvery(LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(GET_USER_DETAILS, getUserDetails);
}
export default authSaga;
