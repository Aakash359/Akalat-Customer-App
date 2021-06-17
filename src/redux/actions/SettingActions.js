import {
    ABOUTUS_REQUEST,
    PRIVACY_REQUEST,
    TERMS_REQUEST,
    FAQ_REQUEST,
    HELP_REQUEST,
    ADDADDRESS_REQUEST,
    ADDRESSLIST_REQUEST,
    EDIT_PROFILE_REQUEST,
    PROFILE_INFO_REQUEST,
    MYORDER_LIST_REQUEST,
    DELETE_ADDRESS_FAILED,
    DELETE_ADDRESS_SUCCESS,
    FAVOURITE_LIST_REQUEST,
    SET_FAVOURITE_LIST_LOADER
    } from '../Types/type';

// =================About Us GET REQUEST =================
export const AboutUsRequest = (data) => {
    
    return {
        type: ABOUTUS_REQUEST,
        data
    };
}

// =================Privacy Policy REQUEST =================
export const PrivacyRequest = (data) => {
    
    return {
        type: PRIVACY_REQUEST,
        data
    };
}

// =================Terms And Conditions GET REQUEST =================
export const TermsRequest = (data) => {
    
    return {
        type: TERMS_REQUEST,
        data
    };
}

// =================FAQ GET REQUEST =================
export const FAQRequest = (data) => {
    
    return {
        type: FAQ_REQUEST,
        data
    };
}

// =================Help And Support GET REQUEST =================
export const HelpRequest = (data) => {
    
    return {
        type: HELP_REQUEST,
        data
    };
}

// =================Edit Profile REQUEST =================
export const ProfileInfoResquest = (data) => {
    
    return {
        type: PROFILE_INFO_REQUEST,
        data
    };
}

// =================Edit Profile REQUEST =================
export const EditProfileResquest = (data) => {
    
    return {
        type: EDIT_PROFILE_REQUEST,
        data
    };
}

// ================= My Order List REQUEST =================
export const myOrderListRequest = (data) => {
    
    return {
        type: MYORDER_LIST_REQUEST,
        data,
       
    };
}

// =================Add Address Post REQUEST =================
export const AddAddressRequest = (data) => {
    
    return {
        type: ADDADDRESS_REQUEST,
        data
    };
}

// =================Address List GET REQUEST =================
export const AddressListResquest = (data) => {
    
    return {
        type: ADDRESSLIST_REQUEST,
        data
    };
}

// =================Delete Address =================
export const deleteAddressRequest = (data) => {
    return {
        type: DELETE_ADDRESS_FAILED ,
        data
    };
}

// =================Delete Address =================
export const deleteAddressSuccess = (data) => {
    return {
        type: DELETE_ADDRESS_SUCCESS ,
        data
    };
}
// =================Delete Address =================
export const deleteAddressFailed = (data) => {
    return {
        type: DELETE_ADDRESS_FAILED ,
        data
    };
}

// ================= Favourite-List Request =================

export const favouriteListRequest = (data) => {return {type: FAVOURITE_LIST_REQUEST,data,}}
export const favouriteListLoader  = (data) => {return {type: SET_FAVOURITE_LIST_LOADER,data,}}