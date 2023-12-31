import {
  ABOUTUS_REQUEST,
  PRIVACY_REQUEST,
  TERMS_REQUEST,
  FAQ_REQUEST,
  HELP_REQUEST,
  ADDADDRESS_REQUEST,
  ADDADDRESS_LOADER,
  ADDRESSLIST_REQUEST,
  SET_ADDRESS_LIST_LOADER,
  MYORDER_LIST_REQUEST,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  FAVOURITE_LIST_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  SET_FAVOURITE_LIST_LOADER,
  DELETE_ADDRESS_FAILED,
  MAKE_SIGNUP_SUCCESS,
  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAILED,
  CHANGE_ORDER_STATUS_LOADER,
  OFFER_LIST_REQUEST,
  OFFER_LIST_LOADER,
  TOGGLE_REQUEST,
} from '../Types/type'

// =================About Us GET REQUEST =================
export const AboutUsRequest = (data) => {
  return {
    type: ABOUTUS_REQUEST,
    data,
  }
}
// =================Offer List  REQUEST =================
export const OfferListRequest = (data) => {
  return {
    type: OFFER_LIST_REQUEST,
    data,
  }
}

// =================Offer List Loader REQUEST =================
export const OfferListLoader = (data) => {
  return {
    type: OFFER_LIST_LOADER,
    data,
  }
}

// =================Privacy Policy REQUEST =================
export const PrivacyRequest = (data) => {
  return {
    type: PRIVACY_REQUEST,
    data,
  }
}

// =================Terms And Conditions GET REQUEST =================
export const TermsRequest = (data) => {
  return {
    type: TERMS_REQUEST,
    data,
  }
}

// =================FAQ GET REQUEST =================
export const FAQRequest = (data) => {
  return {
    type: FAQ_REQUEST,
    data,
  }
}

// =================Help And Support GET REQUEST =================
export const HelpRequest = (data) => {
  return {
    type: HELP_REQUEST,
    data,
  }
}


// ================= My Order List REQUEST =================
export const myOrderListRequest = (data) => {
  return {
    type: MYORDER_LIST_REQUEST,
    data,
  }
}

// =================Add Address Post REQUEST =================
export const AddAddressRequest = (data) => {
  return {
    type: ADDADDRESS_REQUEST,
    data,
  }
}

// =================Add Address Loader  =================
export const AddAddressLoader = (data) => {
  return {
    type: ADDADDRESS_LOADER,
    data,
  }
}

// =================Address List GET REQUEST =================
export const AddressListRequest = (data) => {
  return {
    type: ADDRESSLIST_REQUEST,
    data,
  }
}
// =================Address List Loadar =================
export const AddressListLoader = (data) => {
  return {
    type: SET_ADDRESS_LIST_LOADER,
    data,
  }
}

// =================Delete Address =================
export const deleteAddressRequest = (data) => {
  return {
    type: DELETE_ADDRESS_REQUEST,
    data,
  }
}

// =================Delete Address =================
export const deleteAddressSuccess = (data) => {
  return {
    type: DELETE_ADDRESS_SUCCESS,
    data,
  }
}
// =================Delete Address =================
export const deleteAddressFailed = (data) => {
  return {
    type: DELETE_ADDRESS_FAILED,
    data,
  }
}

// =================changeOrderStatus =================
export const changeOrderStatusRequest = (data, callback = null) => {
  return {
    type: CHANGE_ORDER_STATUS_REQUEST,
    data,
    callback,
  }
}

// =================changeOrderStatus =================
export const changeOrderStatusLoader = (data) => {
  return {
    type: CHANGE_ORDER_STATUS_LOADER,
    data,
  }
}

// =================changeOrderStatus =================
export const changeOrderStatusSuccess = (data) => {
  return {
    type: CHANGE_ORDER_STATUS_SUCCESS,
    data,
  }
}
// =================changeOrderStatus =================
export const changeOrderStatusFailed = (data) => {
  return {
    type: CHANGE_ORDER_STATUS_FAILED,
    data,
  }
}


// =================Delete Address =================
export const changePasswordRequest = (data) => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    data,
  }
}
// ================= Favourite-List Request =================

export const favouriteListRequest = (data) => {
  return {
    type: FAVOURITE_LIST_REQUEST, 
    data
  }
}
export const favouriteListLoader = (data) => {
  return {type: SET_FAVOURITE_LIST_LOADER, data}
}

export const makeSignUpSuccess = (payload) => ({
  type: MAKE_SIGNUP_SUCCESS,
  payload,
})

// ================Notification Toggle Request =================

export const toggleRequest = (data) => {
  return {
    type: TOGGLE_REQUEST,
    data,
  }
}
