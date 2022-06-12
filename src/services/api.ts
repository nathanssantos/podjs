import axios from 'axios';

const baseURL = 'https://itunes.apple.com/';

const api = axios.create({
  baseURL,
  timeout: 10000,
});

export default api;
