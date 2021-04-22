import axios from 'axios';
import {API_BASE} from './ApiService';

const client = axios.create({
  baseURL: API_BASE,
});

// const client1 = axios.create({
//   baseURL: API_BASE,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   timeout: 5000,
// });
const Request = function (options, isHeader = true) {
  console.log('=================================options',options);
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

// const AxiosInstance = axios.create({
//   baseURL: API_BASE,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   timeout: 5000,
// });

// // Add a request interceptor
// AxiosInstance.interceptors.request.use((config) => config, (error) => Promise.reject(error));

// // Add a response interceptor
// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.data) {
//       return Promise.reject(error.response.data);
//     }

//     return Promise.reject(error);
//   },
// );

//export default AxiosInstance;