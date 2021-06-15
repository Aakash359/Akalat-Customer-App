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
    RESTRO_LIST_REQUEST,
    RESTRO_LIST_SUCCESS,
    RESTRO_LIST_FAILED,
    RESTRO_ITEM_REQUEST,
    RESTRO_ITEM_SUCCESS,
    RESTRO_ITEM_FAILED,
  
    } from '../Types/type';

    const initialState = {
        offercardResponse : {},
        error: "",
        verification_status:false,
        offercardStatus: false,
        couponStatus: false,
        couponResponse: {},
        searchResponse:{},
        searchStatus: false,
        restroResponse: {},
        restroStatus: false,
        restroItemResponse: {},
        restroItemStatus: false,
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
            case RESTRO_LIST_REQUEST:
              return {...state, restroStatus:false, restroResponse: action.payload, 
            };
           case RESTRO_LIST_SUCCESS:
              return {...state, restroStatus:true, restroResponse: action.payload,  
            };
           case RESTRO_LIST_FAILED:
              return {...state, restroStatus:false, restroResponse: action.payload,         
            };
            case RESTRO_ITEM_REQUEST:
              return {...state, restroItemStatus:false, restroItemResponse: action.payload, 
            };
           case RESTRO_ITEM_SUCCESS:
              return {...state, restroItemStatus:true, restroItemResponse: action.payload,  
            };
           case RESTRO_ITEM_FAILED:
              return {...state, restroItemStatus:false, restroItemResponse: action.payload,         
            };
           default:
             return state;
         }
        
       }
       