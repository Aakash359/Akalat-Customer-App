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
    SET_FAVOURITE_LOADER,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILED,
    HUNGRY_NOW_LIST_REQUEST,
    HUNGRY_NOW_LIST_SUCCESS,
    HUNGRY_NOW_LIST_FAILED,
    SET_HUNGRY_NOW_LIST_LOADER
  
    } from '../Types/type';

    const initialState = {
        isLoading: false,
        offercardResponse : {},
        error: "",
        verification_status:false,
        offercardStatus: false,
        couponStatus: false,
        couponResponse: {},
        searchResponse:{},
        searchStatus: false,
        addFavouriteResponse:{},
        addFavouriteStatus:false,
        orderDetailsResponse:{},
        orderDetailsStatus:false,
        hungryNowListStatus:false,
        hungryNowListResponse:{},
        setHungryNowListLoader:false,
       };
       
       export default function HomeReducer(state = initialState, action) {
         switch (action.type) {
           case OFFER_CARD_REQUEST:
             return {...state, offercardStatus:false, offercardResponse: action.payload, 
             };
           case OFFER_CARD_SUCCESS:
             return {...state, offercardStatus:true, offercardResponse: action.payload,  
            };
           case OFFER_CARD_FAILED:
             return {...state, offercardStatus:false, offercardResponse: action.payload,         
            };
            case HUNGRY_NOW_LIST_REQUEST:
             return {...state, hungryNowListStatus:false, hungryNowListResponse: action.payload, 
             };
           case  HUNGRY_NOW_LIST_SUCCESS:
             return {...state, hungryNowListStatus:true, hungryNowListResponse: action.payload,  
            };
           case HUNGRY_NOW_LIST_FAILED:
             return {...state, hungryNowListStatus:false, hungryNowListResponse: action.payload,         
            };
            case SET_HUNGRY_NOW_LIST_LOADER:
              return {...state, setHungryNowListLoader: action.payload};
           case COUPON_REQUEST:
             return {...state, couponStatus:false, couponResponse: action.payload, 
            };
           case COUPON_SUCCESS:
             return {...state, couponStatus:true, couponResponse: action.payload,  
            };
           case COUPON_FAILED:
             return {...state, couponStatus:false, couponResponse: action.payload,         
            };
           case SEARCH_REQUEST:
              return {...state, searchStatus:false, searchResponse: action.payload, 
            };
           case SEARCH_SUCCESS:
              return {...state, searchStatus:true, searchResponse: action.payload,  
            };
           case SEARCH_FAILED:
              return {...state, searchStatus:false, searchResponse: action.payload,         
            };
           case ADD_FAVOURITE_REQUEST:
              return {...state, addFavouriteStatus:false, addFavouriteResponse: action.payload, 
            };
           case ADD_FAVOURITE_SUCCESS:
              return {...state, addFavouriteStatus:true,  addFavouriteResponse: action.payload,  
            };
           case ADD_FAVOURITE_FAILED:
              return {...state, addFavouriteStatus:false, addFavouriteResponse: action.payload,         
            };
           case ORDER_DETAILS_REQUEST:
              return {...state, orderDetailsStatus:false, orderDetailsResponse: action.payload, 
            };
           case ORDER_DETAILS_SUCCESS:
              return {...state, orderDetailsStatus:true,  orderDetailsResponse: action.payload,  
            };
           case ORDER_DETAILS_FAILED:
              return {...state, orderDetailsStatus:false, orderDetailsResponse: action.payload,         
            };
           case SET_FAVOURITE_LOADER:
              return {...state, isLoading: action.payload};
           default:
             return state;
         }
        
       }
       