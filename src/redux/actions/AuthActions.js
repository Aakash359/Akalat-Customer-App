import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  OTP_REQUEST,
  OTP_VERIFY_REQUEST,
  LOGOUT_REQUEST,
  LOADER_REQUEST,
  GET_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS,
  SET_SIGNUP_STATUS,
  SIGNUP_LOGIN,
  SET_USER_DETAILS,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAILED,
} from '../Types/type'

//================= SIGNUP POST REQUEST =================
export const SignUpRequest = (params) => {
  return {
    type: SIGNUP_REQUEST,
    params,
  }
}
// ================= LOGIN POST REQUEST =================
export const loginRequest = (data) => {
  return {
    type: LOGIN_REQUEST,
    data,
  }
}

// ================= Send OTP POST REQUEST =================
export const OTPRequest = (data) => {
  return {
    type: OTP_REQUEST,
    data,
  }
}

// =================OTP-Verify POST REQUEST =================
export const OTPVerifyRequest = (data) => {
  return {
    type: OTP_VERIFY_REQUEST,
    data,
  }
}
// =================OTP-Verify POST Success =================
export const OTPVerifySuccess = (data) => {
  return {
    type: OTP_VERIFY_SUCCESS,
    data,
  }
}
// =================OTP-Verify POST Failed =================
export const OTPVerifyFailed = (data) => {
  return {
    type: OTP_VERIFY_FAILED,
    data,
  }
}

// ================= REQUEST =================
export const loaderRequest = (data) => {
  return {
    type: LOADER_REQUEST,
    payload: data,
  }
}

// ================= Log-Out REQUEST =================
export const logOutRequest = (data) => {
  return {
    type: LOGOUT_REQUEST,
    data,
  }
}

export const getUserDetails = (data) => {
  return {
    type: GET_USER_DETAILS_REQUEST,
    data,
  }
}

export const updateUserDetails = (data) => {
  return {
    type: UPDATE_USER_DETAILS,
    data,
  }
}

export const setSignupStatus = (data) => {
  return {
    type: SET_SIGNUP_STATUS,
    data,
  }
}
export const signUpLogin = () => {
  return {
    type: SIGNUP_LOGIN,
  }
}

export const setUserDetails = (payload) => ({type: SET_USER_DETAILS, payload})
