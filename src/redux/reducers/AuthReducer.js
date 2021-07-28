import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOADER_REQUEST,
  SET_INTRO_COMPLETE,
  OTP_REQUEST,
  OTP_SUCCESS,
  OTP_FAILED,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
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
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
  SET_EDIT_PROFILE_LOADER,
  SET_EDIT_PROFILE_STATUS,
} from '../Types/type'

const initialState = {
  isIntro: false,
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
  userProfile: null,
  editProfileResponse: {},
  editProfileStatus: false,
  editProfileError: '',
  editProfileLoader: false,
  userProfile: null,
}

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, loginStatus: false, user: action.payload}
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userProfile: action.payload,
        loginStatus: true,
        userProfile: action.payload,
      }
    case LOGIN_FAILURE:
      return {...state, loginStatus: false, user: action.payload}
    case SET_INTRO_COMPLETE:
      return {...state, isIntro: true}
    case SIGNUP_LOGIN:
      return {
        ...state,
        loginStatus: true,
        SignStatus: false,
        user: {...state.user, ...state.otpVerifyResponse?.data},
        userProfile: state.otpVerifyResponse?.data,
        signupResponse: null,
        userProfile: {...state.user, ...state.otpVerifyResponse?.data},
      }
    case SIGNUP_REQUEST:
      return {...state, SignStatus: false, signupResponse: action.payload}

    case SIGNUP_SUCCESS:
      return {...state, SignStatus: true, signupResponse: action.payload}

    case SET_SIGNUP_STATUS:
      return {...state, SignStatus: action.data}

    case SIGNUP_FAILED:
      return {...state, SignStatus: false, signupResponse: action.payload}

    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
        editProfileStatus: false,
        editProfileResponse: action.payload,
      }
    case SET_EDIT_PROFILE_LOADER:
      return {
        ...state,
        editProfileLoader: action.payload,
      }
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        editProfileStatus: true,
        editProfileResponse: action.data,
        userProfile: action.data,
      }
    case EDIT_PROFILE_FAILED:
      return {
        ...state,
        editProfileError: action.payload,
      }
    case SET_EDIT_PROFILE_STATUS:
      return {
        ...state,
        editProfileStatus: action?.data,
      }

    case OTP_REQUEST:
      return {...state, OTPStatus: false, otpResponse: action.payload}

    case OTP_SUCCESS:
      return {
        ...state,
        OTPStatus: true,
        otpResponse: action.payload,
      }

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
        signupResponse: action.payload,
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
      return {
        ...state,
        logoutStatus: true,
        logoutResponse: action.payload,
        isIntro: true,
      }

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
