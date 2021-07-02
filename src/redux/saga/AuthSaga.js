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
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILED,
  COUNTRY_LIST_REQUEST,
  COUNTRY_LIST_SUCCESS,
  COUNTRY_LIST_FAILED,
} from '../Types/type'
import {put, call, takeEvery, takeLatest} from 'redux-saga/effects'
import Request from '../../apiServices/Request'
import {OTPRequest} from '../actions'

// ====================== Sign-Up POST ======================
export const SignUpSaga = function* SignUpSaga({params}) {
  let data = params
  try {
    const response = yield call(Request, {
      url: '/addUser',
      method: 'POST',
      data,
    })
    if (response?.error) {
      yield put({type: SIGNUP_FAILED, payload: response})
      yield put({type: LOADER_REQUEST, payload: false})
      global.dropDownAlertRef.alertWithType('error', 'Error', response?.message)
    } else {
      yield put({type: SIGNUP_SUCCESS, payload: response})
      yield put({type: LOADER_REQUEST, payload: false})
      yield put(
        OTPRequest({phone: data?.phone, role: 'customer', country_code: '91'}),
      )
    }
  } catch (e) {
    yield put({type: SIGNUP_FAILED, payload: e})
    yield put({type: LOADER_REQUEST, payload: false})
  }
}

// ====================== login Post ======================
export const loginSaga = function* loginSaga({data}) {
  try {
    const response = yield call(Request, {
      url: '/login',
      method: 'POST',
      data,
    })

    if (response?.error == true) {
      yield put({type: LOGIN_FAILURE, payload: response})
      yield put({type: LOADER_REQUEST, payload: false})
      global.dropDownAlertRef.alertWithType('error', 'Error', response?.message)
    } else {
      yield put({type: LOGIN_SUCCESS, payload: response?.data?.profile})

      yield put({type: LOADER_REQUEST, payload: false})
    }
  } catch (e) {
    yield put({type: LOGIN_FAILURE, payload: e})
    yield put({type: LOADER_REQUEST, payload: false})
  }
}

// ====================== Get User Details Post ======================
export const getUserDetails = function* getUserDetails({data}) {
  try {
    const response = yield call(Request, {
      url: '/userDetail',
      method: 'POST',
      data,
    })
    if (response?.error == true) {
      yield put({type: GET_USER_DETAILS_FAILED, payload: response})
      global.dropDownAlertRef.alertWithType('error', 'Error', response?.message)
    } else {
      yield put({type: GET_USER_DETAILS_SUCCESS, payload: response})
    }
  } catch (e) {
    yield put({type: GET_USER_DETAILS_FAILED, payload: e})
  }
}

// ====================== OTP Send Post ======================
export const OtpSaga = function* OtpSaga({data}) {
  //
  try {
    const response = yield call(Request, {
      url: '/sendOtp',
      method: 'POST',
      data,
    })
    //
    if (response?.error == true) {
      yield put({type: OTP_FAILED, payload: response})
      global.dropDownAlertRef.alertWithType('error', 'Error', response?.message)
    } else {
      yield put({type: OTP_SUCCESS, payload: response})
    }
  } catch (e) {
    yield put({type: OTP_FAILED, payload: e})
  }
}

// ====================== OTP Verify Post ======================
export const OtpVerifySaga = function* OtpVerifySaga({data}) {
  try {
    const response = yield call(Request, {
      url: '/verifyOtp',
      method: 'POST',
      data,
    })

    console.log('====================================')
    console.log(response)
    console.log('====================================')

    if (response?.error == true) {
      yield put({type: OTP_VERIFY_FAILED, payload: response})
      global.dropDownAlertRef.alertWithType('error', 'Error', response?.message)
    } else {
      yield put({type: OTP_VERIFY_SUCCESS, payload: response})
    }
  } catch (e) {
    yield put({type: OTP_VERIFY_FAILED, payload: e})
  }
}

// ====================== Log-Out Post ======================
export const logoutSaga = function* logoutSaga({data}) {
  try {
    yield put({type: LOGOUT_SUCCESS})
  } catch (e) {
    yield put({type: LOGOUT_FAILED, payload: e})
  }
}

// ====================== Country Code List GET ======================

export const countryListSaga = function* getUserDetails({data}) {
  try {
    const response = yield call(Request, {
      url: '/listCountry',
      method: 'POST',
      data,
    })
    if (response?.error == true) {
      yield put({type: COUNTRY_LIST_FAILED, payload: response})
      global.dropDownAlertRef.alertWithType('error', 'Error', response?.message)
    } else {
      yield put({type: COUNTRY_LIST_SUCCESS, payload: response})
    }
  } catch (e) {
    yield put({type: COUNTRY_LIST_FAILED, payload: e})
  }
}

export function* authSaga() {
  yield takeEvery(SIGNUP_REQUEST, SignUpSaga)
  yield takeEvery(LOGIN_REQUEST, loginSaga)
  yield takeEvery(OTP_REQUEST, OtpSaga)
  yield takeEvery(OTP_VERIFY_REQUEST, OtpVerifySaga)
  yield takeEvery(LOGOUT_REQUEST, logoutSaga)
  yield takeLatest(GET_USER_DETAILS_REQUEST, getUserDetails)
  yield takeLatest(COUNTRY_LIST_REQUEST, countryListSaga)
}
export default authSaga
