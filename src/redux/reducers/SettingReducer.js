import {
  ABOUTUS_REQUEST,
  ABOUTUS_SUCCESS,
  ABOUTUS_FAILED,
  PRIVACY_REQUEST,
  PRIVACY_SUCCESS,
  PRIVACY_FAILED,
  TERMS_REQUEST,
  TERMS_SUCCESS,
  TERMS_FAILED,
  FAQ_REQUEST,
  FAQ_SUCCESS,
  FAQ_FAILED,
  HELP_REQUEST,
  HELP_SUCCESS,
  HELP_FAILED,
  ADDADDRESS_REQUEST,
  ADDADDRESS_SUCCESS,
  ADDADDRESS_FAILED,
  ADDRESSLIST_REQUEST,
  ADDRESSLIST_SUCCESS,
  ADDRESSLIST_FAILED,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
  // PROFILE_INFO_REQUEST,
  // PROFILE_INFO_SUCCESS,
  // PROFILE_INFO_FAILED,
  MYORDER_LIST_REQUEST,
  MYORDER_LIST_SUCCESS,
  MYORDER_LIST_FAILED,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILED,
  FAVOURITE_LIST_REQUEST,
  FAVOURITE_LIST_SUCCESS,
  FAVOURITE_LIST_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  SET_FAVOURITE_LIST_LOADER,
  SET_EDIT_PROFILE_LOADER,
  SET_EDIT_PROFILE_STATUS,
} from '../Types/type'

const initialState = {
  isLoading: false,
  aboutUsResponse: {},
  privacyResponse: {},
  termsResponse: {},
  faqResponse: [],
  helpResponse: {},
  termsStatus: false,
  faqStatus: false,
  helpStatus: false,
  aboutUsStatus: false,
  privacyStatus: false,
  addAddressResponse: {},
  addAddressStatus: false,
  addressListResponse: {},
  addressListStatus: false,
  editProfileResponse: {},
  editProfileStatus: false,
  editProfileError: '',
  editProfileLoader: false,
  myOrderListResponse: {},
  myOrderListStatus: false,
  error: '',
  delAddSucRes: null,
  delAddFailRes: null,
  favouriteListResponse: {},
  favouriteListStatus: false,
  setFavouriteListLoader: false,
  changePasswordResponse: {},
  changePasswordStatus: false,
}

export default function SettingReducer(state = initialState, action) {
  switch (action.type) {
    case ABOUTUS_REQUEST:
      return {
        ...state,
        aboutUsStatus: false,
        aboutUsResponse: action.payload,
      }
    case ABOUTUS_SUCCESS:
      return {
        ...state,
        aboutUsStatus: true,
        aboutUsResponse: action.payload,
      }
    case ABOUTUS_FAILED:
      return {
        ...state,
        aboutUsStatus: false,
        aboutUsResponse: action.payload,
      }
    case PRIVACY_REQUEST:
      return {
        ...state,
        privacyStatus: false,
        privacyResponse: action.payload,
      }
    case PRIVACY_SUCCESS:
      return {
        ...state,
        privacyStatus: true,
        privacyResponse: action.payload,
      }
    case PRIVACY_FAILED:
      return {
        ...state,
        privacyStatus: false,
        privacyResponse: action.payload,
      }
    case TERMS_REQUEST:
      return {...state, termsStatus: false, termsResponse: action.payload}
    case TERMS_SUCCESS:
      return {...state, termsStatus: true, termsResponse: action.payload}
    case TERMS_FAILED:
      return {...state, termsStatus: false, termsResponse: action.payload}
    case FAQ_REQUEST:
      return {...state, privacyStatus: false, faqResponse: action.payload}
    case FAQ_SUCCESS:
      return {...state, privacyStatus: true, faqResponse: action.payload}
    case FAQ_FAILED:
      return {...state, privacyStatus: false, faqResponse: action.payload}
    case HELP_REQUEST:
      return {...state, helpStatus: false, helpResponse: action.payload}
    case HELP_SUCCESS:
      return {...state, helpStatus: true, helpResponse: action.payload}
    case HELP_FAILED:
      return {...state, helpStatus: false, helpResponse: action.payload}
    case ADDADDRESS_REQUEST:
      return {
        ...state,
        addAddressStatus: false,
        addAddressResponse: action.payload,
      }
    case ADDADDRESS_SUCCESS:
      return {
        ...state,
        addAddressStatus: true,
        addAddressResponse: action.payload,
      }
    case ADDADDRESS_FAILED:
      return {
        ...state,
        addAddressStatus: false,
        addAddressResponse: action.payload,
      }
    case DELETE_ADDRESS_SUCCESS:
      return {...state, delAddSucRes: action.data}
    case DELETE_ADDRESS_FAILED:
      return {...state, delAddFailRes: action.data}
    case ADDRESSLIST_REQUEST:
      return {
        ...state,
        addressListStatus: false,
        addressListResponse: action.payload,
      }
    case ADDRESSLIST_SUCCESS:
      return {
        ...state,
        addressListStatus: true,
        addressListResponse: action.payload,
      }
    case ADDRESSLIST_FAILED:
      return {
        ...state,
        addressListStatus: false,
        addressListResponse: action.payload,
      }
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
        editProfileResponse: action.payload,
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
    case MYORDER_LIST_REQUEST:
      return {
        ...state,
        myOrderListStatus: false,
        myOrderListResponse: action.payload,
      }
    case MYORDER_LIST_SUCCESS:
      return {
        ...state,
        myOrderListStatus: true,
        myOrderListResponse: action.payload,
      }
    case MYORDER_LIST_FAILED:
      return {
        ...state,
        myOrderListStatus: false,
        myOrderListResponse: action.payload,
      }
    case FAVOURITE_LIST_REQUEST:
      return {
        ...state,
        favouriteListStatus: false,
        favouriteListResponse: action.payload,
      }
    case FAVOURITE_LIST_SUCCESS:
      return {
        ...state,
        favouriteListStatus: true,
        favouriteListResponse: action.payload,
      }
    case FAVOURITE_LIST_FAILED:
      return {
        ...state,
        favouriteListStatus: false,
        favouriteListResponse: action.payload,
      }
    case SET_FAVOURITE_LIST_LOADER:
      return {...state, setFavouriteListLoader: action.payload}
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordStatus: false,
        changePasswordResponse: action.payload,
      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordStatus: true,
        changePasswordResponse: action.payload,
      }
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        changePasswordStatus: false,
        changePasswordResponse: action.payload,
      }

    default:
      return state
  }
}
