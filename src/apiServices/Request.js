import axios from 'axios';
import {API_BASE} from './ApiService';

const client = axios.create({
  baseURL: API_BASE,
});

const Request = function (options, isHeader = true) {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else {
      console.log('Error Message:', error.message);
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default Request;
