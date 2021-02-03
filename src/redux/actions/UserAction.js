import {
  FETCHING_USER_SUCCESS,
  FETCHING_USER_PROGRESS,
  FETCHING_USER_FAILURE,
  
} from './ActionTypes';


function getUserSuccess(user) {
  return {
    type: FETCHING_USER_SUCCESS,
    payload: user,
  };
}

function getUserProgress() {
  return {
    type: FETCHING_USER_PROGRESS,
  };
}
function fetchingUserReset() {
  return {
    type: FETCHING_USER_RESET,
  };
}
function getUserFailure(error) {
  return {
    type: FETCHING_USER_FAILURE,
    payload: error,
  };
}

export const signUp = user => {
  return dispatch => {
    dispatch(getUserProgress());

    UserService.doRegister(user)
      .then(res => {
        if (res.error) {
          dispatch(getUserFailure(res.error));
          throw res.error;
        }
        if (res.status != 400) {
          dispatch(getUserSuccess(res.data));
        }
      })
      .catch(error => {
        if (error.data.status_code === 422) {
          dispatch(getUserFailure(error.data.errors.email[0]));
        }

        if (error.data.status_code === 404) {
          dispatch(getUserFailure(error.data.message));
        }
      });
  };
};
