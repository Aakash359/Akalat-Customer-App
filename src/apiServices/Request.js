import axios from 'axios'
import {API_BASE} from './ApiService'

const client = axios.create({
  baseURL: API_BASE,
})

const Request = function (options) {
  const onSuccess = (response) => {
    return response.data
  }

  const onError = (error) => {
    if (error.response) {
      console.log('Data:', error.response.data)
    } else {
      console.log('Error Message:', error.message)
    }
    return Promise.reject(error.response || error.message)
  }

  return client(options).then(onSuccess).catch(onError)
}

export default Request
