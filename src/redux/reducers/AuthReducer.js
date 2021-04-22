import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
  } from '../Types/type';
  
  const initialState = {
   user : null,
   loginStatus: false,
   };
  
  export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loginStatus:false,          
        user: action.payload, 
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload,
          },
        loginStatus:true,
       // user: action.payload.data,        
        };
      case LOGIN_FAILURE:
        return {
          ...state,          
          loginStatus:false,          
        user: action.payload,         
        };


     default:
        return state;
    }
  }
  