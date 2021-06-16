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
    PROFILE_INFO_REQUEST,
    PROFILE_INFO_SUCCESS,
    PROFILE_INFO_FAILED,
    MYORDER_LIST_REQUEST,
    MYORDER_LIST_SUCCESS,
    MYORDER_LIST_FAILED,
    DELETE_ADDRESS_REQUEST,
    FAVOURITE_LIST_REQUEST,
    FAVOURITE_LIST_SUCCESS,
    FAVOURITE_LIST_FAILED,

    } from '../Types/type';
import { put, call, takeEvery } from 'redux-saga/effects';
import Request from '../../apiServices/Request'; 
import {
  favouriteListLoader,
} from '../actions/SettingActions';
import { deleteAddressFailed, deleteAddressSuccess, signUpLogin } from '../actions';


// ====================== About US GET ======================
export const AboutUsSaga = function* AboutUsSaga({data}) {
  
    try {
        const response = yield call(Request, {
            url: 'customer/aboutus',
            method: 'GET',
            data,
          })
          
          if (response?.data?.error == true){
            yield put({ type: ABOUTUS_FAILED, payload: response });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
          }
       else{ 
           yield put({ type: ABOUTUS_SUCCESS, payload: response?.data });
         
        }
        
    }
    catch (e) {
        
        yield put({ type: ABOUTUS_FAILED, payload: e });
    }
}


// ====================== Privacy GET ======================
export const PrivacySaga = function* PrivacySaga({params}) {
    let data = params
    // 
    try {
        const response = yield call(Request, {
            url: '/customer/privacyPolicy',
            method: 'GET',
            data,
          })
          
          if (response?.data?.error == true){
            yield put({ type: PRIVACY_FAILED, payload: response?.data  });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
          }
       else{ 
           yield put({ type: PRIVACY_SUCCESS, payload: response });
        
        }
        
    }
    catch (e) {
        
        yield put({ type: PRIVACY_FAILED, payload: e });
    }
}

// ====================== Terms And Conditions GET ======================
export const TermSaga = function* TermSaga({params}) {
    let data = params
    // 
    try {
        const response = yield call(Request, {
            url: '/customer/termsAndCondition',
            method: 'GET',
            data,
          })
          
          if (response?.data?.error == true){
            yield put({ type: TERMS_FAILED, payload: response?.data  });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
          }
       else{ 
           yield put({ type: TERMS_SUCCESS, payload: response });
        //    
        }
        
    }
    catch (e) {
        
        yield put({ type: TERMS_FAILED, payload: e });
    }
}

// ====================== FAQ GET ======================
export const FaqSaga = function* FaqSaga({data}) {
  
    try {
        const response = yield call(Request, {
            url: '/getFaq',
            method: 'POST',
            data,
          })
          
          if (response?.data?.error == true){
            yield put({ type: FAQ_FAILED, payload: response?.data  });
           
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
            
          }
       else{ 
           yield put({ type: FAQ_SUCCESS, payload: response });
           
        
        }
        
    }
    catch (e) {
        
        yield put({ type: FAQ_FAILED, payload: e });
    }
}

// ====================== Help and Support POST ======================
export const HelpSaga = function* HelpSaga({data}) {
   
    // 
    try {
        const response = yield call(Request, {
            url: '/addHelpAndsupport',
            method: 'POST',
            data,
          })
          
          if (response?.data?.error == true){
            yield put({ type: HELP_FAILED, payload: response });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
           
          }
       else{ 
           yield put({ type: HELP_SUCCESS, payload: response });
        //    alert("Submitted Sucessfully")
        }
        
    }
    catch (e) {
        
        yield put({ type: HELP_FAILED, payload: e });
    }
}

// ====================== Add Address  POST ======================
export const AddAddressSaga = function* AddAddressSaga({data}) {
   
    // 
    try {
        const response = yield call(Request, {
            url: '/addUserAddress',
            method: 'POST',
            data,
          })
          
          if (response?.error){
            yield put({ type: ADDADDRESS_FAILED, payload: response });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.message,
            );
           
          }
       else{ 
           yield put({ type: ADDADDRESS_SUCCESS, payload: response });
           yield put(signUpLogin())
             
        }
        
    }
    catch (e) {
        
        yield put({ type: ADDADDRESS_FAILED, payload: e });
    }
}

// ====================== Address List  POST ======================
export const AddressListSaga = function* AddressListSaga({data}) {
   
    // 
    try {
        const response = yield call(Request, {
            url: '/listUserAddress',
            method: 'POST',
            data,
          })
          
          if (response?.data?.error == true){
            yield put({ type: ADDRESSLIST_FAILED, payload: response });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
           
          }
       else{ 
           yield put({ type: ADDRESSLIST_SUCCESS, payload: response });
             
        }
        
    }
    catch (e) {
        
        yield put({ type: ADDRESSLIST_FAILED, payload: e });
    }
}

// ====================== Profie Info GET ======================

export const EditProfileSaga = function* EditProfileSaga({data}) {
   
    
    try {
        const response = yield call(Request, {
            url: '/editUser',
            method: 'POST',
            data,
          })
          
          if (response?.data?.error == true){
            yield put({ type: EDIT_PROFILE_FAILED, payload: response });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
           
          }
       else{ 
           yield put({ type: EDIT_PROFILE_SUCCESS, payload: response });
             
        }
        
    }
    catch (e) {
        
        yield put({ type: EDIT_PROFILE_FAILED, payload: e });
    }
}

// ====================== Edit Profie POST ======================
export const ProfileInfoSaga = function* ProfileInfoSaga({data}) {
   
    // 
    try {
        const response = yield call(Request, {
            url: '/editUser',
            method: 'POST',
            data,
          })
          
          if (response?.data?.error == true){
            yield put({ type: PROFILE_INFO_FAILED, payload: response });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
           
          }
       else{ 
           yield put({ type: PROFILE_INFO_SUCCESS, payload: response });
             
        }
        
    }
    catch (e) {
        
        yield put({ type: PROFILE_INFO_FAILED, payload: e });
    }
}

// ====================== My Order List POST ======================
export const MyOrderListSaga = function* MyOrderListSaga({data}) {
   
   
    try {
        const response = yield call(Request, {
            url: 'http://3.7.147.28:3327/api/v1/order/activeOrder',
            method: 'POST',
            data,
          })
          
          if (response?.data?.error == true){
            yield put({ type: MYORDER_LIST_FAILED, payload: response });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
           
          }
       else{ 
           yield put({ type: MYORDER_LIST_SUCCESS, payload: response });
           
             
        }
        
      }
        catch (e) {
            
            yield put({ type: MYORDER_LIST_FAILED, payload: e });
        }
}

// ====================== DELETE ADDRESS ======================
 function* deleteAddress({data}) {
   
   
  try {
      const response = yield call(Request, {
          url: 'http://3.7.147.28:3328/api/v1/deleteUserAddress',
          method: 'POST',
          data,
        })
        
        if (response?.error){
          yield put(deleteAddressFailed(response));
          global.dropDownAlertRef.alertWithType(
            'error',
            'Error',
             response?.message,
          );
         
        }
     else{ 
         yield put(deleteAddressSuccess(response));
         
           
      }
      
    }
      catch (e) {
          
          yield put(deleteAddressFailed(e));
      }
}

// ====================== Terms And Conditions GET ======================
export const favouriteList = function* favouriteList({params}) {
  let data = params
  yield put(favouriteListLoader(true));
  try {
      const response = yield call(Request, {
          url: '/listFavouritedRestro',
          method: 'POST',
          data,
        })
        
        if (response?.data?.error == true){
          yield put({ type: FAVOURITE_LIST_FAILED, payload: response?.data  });
          yield put(favouriteListLoader(false));
          global.dropDownAlertRef.alertWithType(
            'error',
            'Error',
             response?.data?.message,
          );
        }
     else{ 
         yield put({ type: FAVOURITE_LIST_SUCCESS, payload: response });
         yield put(favouriteListLoader(false));
     
      }
      
  }
  catch (e) {
      yield put(favouriteListLoader(false));
      yield put({ type: FAVOURITE_LIST_FAILED, payload: e });
  }
}

export function* settingSaga() {
    yield takeEvery(ABOUTUS_REQUEST, AboutUsSaga);
    yield takeEvery(PRIVACY_REQUEST, PrivacySaga);
    yield takeEvery(TERMS_REQUEST, TermSaga);
    yield takeEvery(FAQ_REQUEST, FaqSaga);
    yield takeEvery(HELP_REQUEST, HelpSaga);
    yield takeEvery(ADDADDRESS_REQUEST, AddAddressSaga);
    yield takeEvery(ADDRESSLIST_REQUEST, AddressListSaga);
    yield takeEvery(EDIT_PROFILE_REQUEST, EditProfileSaga);
    yield takeEvery(PROFILE_INFO_REQUEST, ProfileInfoSaga);
    yield takeEvery(MYORDER_LIST_REQUEST, MyOrderListSaga);
    yield takeEvery(DELETE_ADDRESS_REQUEST, deleteAddress);
    yield takeEvery(FAVOURITE_LIST_REQUEST, favouriteList);

}
export default settingSaga;

