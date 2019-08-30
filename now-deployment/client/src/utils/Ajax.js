import axios from 'axios';

axios.defaults.withCredentials = true; // ! IMPORTANT

export default {
  // Authentication/Passport Endpoints
  verify: () => {
    return axios('http://localhost:5000/api/users/verify', {
      method: 'get',
      validateStatus: status => {
        return status < 400;
      }
    });
  },
  login: data => {
    return axios.post('http://localhost:5000/api/users/login', data);
  },
  logout: () => {
    return axios.get('http://localhost:5000/api/users/logout');
  },

  // Product Management Endpoints
  getProductsByUserId: id => {
    return axios('http://localhost:5000/api/users/products', {
      method: 'get'
    });
  },
  removeProduct: pid => {
    return axios.delete('http://localhost:5000/api/users/products/' + pid);
  },
  addProduct: data => {
    return axios.post('http://localhost:5000/api/users/products/', data);
  }
};
