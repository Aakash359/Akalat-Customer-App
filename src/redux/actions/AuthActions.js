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
  COUNTRY_LIST_REQUEST,
  SET_OTP_VERIFY_STATUS,
  SET_INTRO_COMPLETE,
  EDIT_PROFILE_REQUEST,
  SET_EDIT_PROFILE_LOADER,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
  SET_EDIT_PROFILE_STATUS,
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

// ================= Send OTP POST REQUEST =================
export const countryListRequest = (data) => {
  return {
    type: COUNTRY_LIST_REQUEST,
    data,
  }
}

// =================Edit Profile REQUEST =================
export const EditProfileRequest = (data, callback = null) => {
  return {
    type: EDIT_PROFILE_REQUEST,
    data,
    callback,
  }
}
// =================Set Edit Profile LOADER =================
export const setEditProfileLoader = (payload) => {
  return {
    type: SET_EDIT_PROFILE_LOADER,
    payload,
  }
}
// =================Edit Profile SUCCUSS =================
export const editProfileSuccess = (data) => {
  return {
    type: EDIT_PROFILE_SUCCESS,
    data,
  }
}

// =================Edit Profile FAILED =================
export const editProfileFailed = (data) => {
  return {
    type: EDIT_PROFILE_FAILED,
    data,
  }
}
// =================SET edit Profile status =================
export const SetEditProfileStatus = (data) => {
  return {
    type: SET_EDIT_PROFILE_STATUS,
    data,
  }
}

export const setUserDetails = (payload) => (
  {
    type: SET_USER_DETAILS, 
    payload
  }
  )

export const setOtpVerifyStatus = (payload) => ({
  type: SET_OTP_VERIFY_STATUS,
  payload,
})

export function setIntroComplete() {
  return {
    type: SET_INTRO_COMPLETE
  }
}
