import request from './Request';

import {
  LOGIN_URL,
  API_SIGNUP,
} from './ApiService';

function doLogin(data) {
  return request({url: LOGIN_URL, method: 'POST', data});
}

function doRegister(data) {
  return request({
    url: API_SIGNUP,
    method: 'POST',
    data,
  });
}

export default {
  doLogin,
  doRegister,
};
