import axios from 'axios';

axios.defaults.withCredentials = true; // ! IMPORTANT

const preUrl = 'http://localhost:5000';

export default {
  // Authentication/Passport Endpoints
  verify: () => {
    return axios(preUrl + '/api/users/verify', {
      method: 'get',
      validateStatus: status => {
        return status < 400;
      }
    });
  },
  login: data => {
    return axios.post(preUrl + '/api/users/login', data);
  },
  logout: () => {
    return axios.get(preUrl + '/api/users/logout');
  },

  // Product Management Endpoints
  getProductsByUserId: id => {
    return axios(preUrl + '/api/users/products', {
      method: 'get'
    });
  },
  removeProduct: pid => {
    return axios.delete(preUrl + '/api/users/products/' + pid);
  },
  addProduct: data => {
    return axios.post(preUrl + '/api/users/products/', data);
  }
};
