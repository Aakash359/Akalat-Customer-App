import {
    FETCHING_USER,
    FETCHING_USER_SUCCESS,
    FETCHING_USER_PROGRESS,
    FETCHING_USER_FAILURE,
    FETCHING_USER_RESET,
    
  } from '../actions/ActionTypes';
  
  const initialState = {
    user: null,
    isFetchingUser: false,
    isFetchingPassword: false,   
    userError: false,
    isUserSuccess: false,    
    message: null,
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case FETCHING_USER:
        return {
          ...state,
          user: null,
          isFetchingUser: false,
          userError: false,
          isUserSuccess: false,
         
          message: null,
        };
      case FETCHING_USER_SUCCESS:
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload,
          },
          isUserSuccess: true,
          isFetchingUser: false,
        };
      case FETCHING_USER_FAILURE:
        return {
          ...state,
          isFetchingUser: false,
          isUserSuccess: false,
          userError: true,
          message: action.payload,
        };
  
      case FETCHING_USER_PROGRESS:
        return {
          ...state,
          isFetchingUser: true,
          userError: false,
          isUserSuccess: false,         
          message: null,
        };
      case FETCHING_USER_RESET:
        return {
          ...state,
          isFetchingUser: false,
          isFetchingPassword: false,
          userError: false,
          isUserSuccess: false,         
          message: null,
        };
      
      default:
        return state;
    }
  }
  