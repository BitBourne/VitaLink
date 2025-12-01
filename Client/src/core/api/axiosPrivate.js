import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 15000,
});

export default axiosPrivate;