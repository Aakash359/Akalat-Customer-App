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
  UPDATE_USER_DETAILS,
  SET_SIGNUP_STATUS,
  SIGNUP_LOGIN,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILED,
  SET_USER_DETAILS,
  COUNTRY_LIST_REQUEST,
  COUNTRY_LIST_SUCCESS,
  COUNTRY_LIST_FAILED,
  SET_OTP_VERIFY_STATUS,
} from '../Types/type'

const initialState = {
  user: {},
  error: '',
  isLoading: false,
  verification_status: false,
  loginStatus: false,
  SignStatus: false,
  OTPStatus: false,
  logoutStatus: false,
  signupResponse: {},
  otpResponse: {},
  logoutResponse: {},
  getUserDetailsResponse: {},
  getUserDetailsStatus: false,
  counrtryListResponse: {},
  counrtryListStatus: false,
  OTPVerifyStatus: false,
  otpVerifyResponse: {},
}

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, loginStatus: false, user: action.payload}
    case LOGIN_SUCCESS:
      return {...state, user: action.payload, loginStatus: true}
    case LOGIN_FAILURE:
      return {...state, loginStatus: false, user: action.payload}
    case SIGNUP_LOGIN:
      return {
        ...state,
        loginStatus: true,
        SignStatus: false,
        user: {...state.user, ...state.signupResponse?.data},
        signupResponse: null,
      }
    case SIGNUP_REQUEST:
      return {...state, SignStatus: false, signupResponse: action.payload}

    case SIGNUP_SUCCESS:
      return {...state, SignStatus: true, signupResponse: action.payload}

    case SET_SIGNUP_STATUS:
      return {...state, SignStatus: action.data}

    case SIGNUP_FAILED:
      return {...state, SignStatus: false, signupResponse: action.payload}

    case OTP_REQUEST:
      return {...state, OTPStatus: false, otpResponse: action.payload}

    case OTP_SUCCESS:
      return {...state, OTPStatus: true, otpResponse: action.payload}

    case OTP_FAILED:
      return {...state, OTPStatus: false, otpResponse: action.payload}

    case COUNTRY_LIST_REQUEST:
      return {
        ...state,
        counrtryListStatus: false,
        counrtryListResponse: action.payload,
      }

    case COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        counrtryListStatus: true,
        counrtryListResponse: action.payload,
      }

    case COUNTRY_LIST_FAILED:
      return {
        ...state,
        counrtryListStatus: false,
        counrtryListResponse: action.payload,
      }

    case OTP_VERIFY_REQUEST:
      return {
        ...state,
        OTPVerifyStatus: false,
        otpVerifyResponse: action.payload,
      }

    case OTP_VERIFY_SUCCESS:
      return {
        ...state,
        OTPVerifyStatus: true,
        otpVerifyResponse: action.payload,
      }

    case OTP_VERIFY_FAILED:
      return {
        ...state,
        OTPVerifyStatus: false,
        otpVerifyResponse: action.payload,
      }

    case LOGOUT_REQUEST:
      return {...state, logoutStatus: false, logoutResponse: action.payload}

    case LOGOUT_SUCCESS:
      return {...state, logoutStatus: true, logoutResponse: action.payload}

    case LOGOUT_FAILED:
      return {...state, logoutStatus: false, logoutResponse: action.payload}

    case GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        getUserDetailsStatus: false,
        getUserDetailsResponse: action.payload,
      }

    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        getUserDetailsStatus: true,
        getUserDetailsResponse: action.payload,
      }

    case GET_USER_DETAILS_FAILED:
      return {
        ...state,
        getUserDetailsStatus: false,
        getUserDetailsResponse: action.payload,
      }

    case LOADER_REQUEST:
      return {...state, isLoading: action.payload}

    case UPDATE_USER_DETAILS:
      return {...state, user: {...state.user, ...action.payload}}
    case SET_USER_DETAILS:
      let ud = action.payload
      return {
        ...state,
        user: {
          ...state.user,
          first_name: ud.first_name,
          last_name: ud.last_name,
          phone: ud.phone,
          email: ud.email,
          _id: state.user._id,
        },
      }
    case SET_OTP_VERIFY_STATUS:
      return {...state, OTPVerifyStatus: action?.payload}
    default:
      return state
  }
}
