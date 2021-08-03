import {
    OFFER_CARD_REQUEST,
    OFFER_CARD_SUCCESS,
    OFFER_CARD_FAILED,
    COUPON_REQUEST,
    COUPON_SUCCESS,
    COUPON_FAILED,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILED,
    ADD_FAVOURITE_REQUEST,
    ADD_FAVOURITE_SUCCESS,
    ADD_FAVOURITE_FAILED,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILED,
    HUNGRY_NOW_LIST_REQUEST,
    HUNGRY_NOW_LIST_SUCCESS,
    HUNGRY_NOW_LIST_FAILED,
    SET_HUNGRY_NOW_LIST_LOADER,
    } from '../Types/type';
import {setFavouriteLoader,hungryNowListLoader
      } from '../actions/HomeActions';    
import { put, call, takeEvery } from 'redux-saga/effects';
import Request from '../../apiServices/Request'; 


//====================== Sign-Up POST =======================
export const OfferSaga = function* OfferSaga(data) {
    
    try {
        const response = yield call(Request, {
            url: '/banner/bannerList',
            method: 'POST',
            data,
          })
          if (response?.data?.error == true){
            yield put({ type: OFFER_CARD_FAILED, payload: response?.data  });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
          }
       else{ 
           yield put({ type: OFFER_CARD_SUCCESS, payload: response });
        }
        
    }
    catch (e) {
        
        yield put({ type: OFFER_CARD_FAILED, payload: e });
    }
}

//====================== Coupon POST ======================

export const CouponSaga = function* CouponSaga({data}) {
 
    try {
        const response = yield call(Request, {
            url: 'globalCouponCodesForUser',
            method: 'POST',
            data,
          })
          if (response?.data?.error == true){
            yield put({ type: COUPON_FAILED, payload: response?.data  });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
          }
       else{ 
           yield put({ type: COUPON_SUCCESS, payload: response });
        }
        
    }
    catch (e) {
        
        yield put({ type: COUPON_FAILED, payload: e });
    }
}

//====================== Hungry Now List POST ======================

export const hungryNowListSaga = function* hungryNowListSaga({data}) {
 

  
  yield put({type: SET_HUNGRY_NOW_LIST_LOADER, payload: true})
  try {
      const response = yield call(Request, {
          url: 'product/listHungryProduct',
          method: 'POST',
          data,
        })
        if (response?.data?.error == true){
          yield put({ type: HUNGRY_NOW_LIST_FAILED, payload: response?.data  });
          yield put({type: SET_HUNGRY_NOW_LIST_LOADER, payload: false})
          global.dropDownAlertRef.alertWithType(
            'error',
            'Error',
             response?.data?.message,
          );
        }
     else{ 
        
         yield put({type: SET_HUNGRY_NOW_LIST_LOADER, payload: false})
         yield put({ type: HUNGRY_NOW_LIST_SUCCESS, payload: response });
      }
      
  }
  catch (e) {
    
      yield put({type: SET_HUNGRY_NOW_LIST_LOADER, payload: false})
      yield put({ type: HUNGRY_NOW_LIST_FAILED, payload: e });
  }
}


//====================== Search Reasturants POST ======================

export const SearchSaga = function* SearchSaga({params}) {
    let data = params
    try {
        const response = yield call(Request, {
            url: 'restro/search',
            method: 'POST',
            data,
          })
          if (response?.data?.error == true){
            yield put({ type: SEARCH_FAILED, payload: response?.data  });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
          }
       else{ 
           yield put({ type: SEARCH_SUCCESS, payload: response });
        }
        
    }
    catch (e) {
        
        yield put({ type: SEARCH_FAILED, payload: e });
    }
}

//====================== Add favourite POST ======================

export const AddFavouriteSaga = function* AddFavouriteSaga({data}) {
 
    yield put(setFavouriteLoader(true));
    try {
        const response = yield call(Request, {
            url: 'restro/addFavouritedRestro',
            method: 'POST',
            data,
          })
          if (response?.data?.error == true){
            yield put({ type: ADD_FAVOURITE_FAILED, payload: response?.data  });
            
            yield put(setFavouriteLoader(false));
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
          }
       else{ 
           yield put(setFavouriteLoader(false));
           yield put({ type: ADD_FAVOURITE_SUCCESS, payload: response });
        }
        
    }
    catch (e) {
        yield put(setFavouriteLoader(false));
        yield put({ type: ADD_FAVOURITE_FAILED, payload: e });
    }
}

//====================== Odder Details POST ======================

export const OrderDetailsSaga = function* OrderDetailsSaga({data}) {
 
    try {
        const response = yield call(Request, {
            url: 'order/orderDetail',
            method: 'POST',
            data,
          })
          if (response?.data?.error == true){
            yield put({ type: ORDER_DETAILS_FAILED, payload: response?.data  });
            global.dropDownAlertRef.alertWithType(
              'error',
              'Error',
               response?.data?.message,
            );
          }
       else{ 
          yield put({ type: ORDER_DETAILS_SUCCESS, payload: response });
        }
        
    }
    catch (e) {
      yield put({ type: ORDER_DETAILS_FAILED, payload: e });
    }
}



export function* homeSaga() {
    yield takeEvery(OFFER_CARD_REQUEST, OfferSaga);
    yield takeEvery(COUPON_REQUEST, CouponSaga);
    yield takeEvery(SEARCH_REQUEST, SearchSaga);
    yield takeEvery(ADD_FAVOURITE_REQUEST, AddFavouriteSaga);
    yield takeEvery(ORDER_DETAILS_REQUEST, OrderDetailsSaga);
    yield takeEvery(HUNGRY_NOW_LIST_REQUEST, hungryNowListSaga);
}
export default homeSaga;