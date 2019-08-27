import axios from 'axios';

// ! USING JSON PLACEHOLDER

export default {
  verify: () => {
    return axios.get('http://localhost:5000/api/users/verify');
  },
  getAllProducts: () => {
    //return axios.get('https://jsonplaceholder.typicode.com/albums?_limit=5');
    return axios.get('http://localhost:5000/api/products');
  },
  getProductsByUserId: id => {
    return axios.get('/api/users/' + id + '/products');
  }
};
