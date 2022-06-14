import axios from 'axios';

const baseURL = 'https://itunes.apple.com/';

const api = axios.create({
  baseURL,
  timeout: 20000,
});

export default api;
