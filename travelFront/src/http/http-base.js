import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://localhost:3400/',
  headers: {
    'x-access-token': localStorage.getItem('id_token') 
  }
})