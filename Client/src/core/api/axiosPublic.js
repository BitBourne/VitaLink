import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

export default axiosPublic;