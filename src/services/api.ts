import axios from 'axios';
import { parseCookies } from 'nookies';

export const getApi = (ctx?: any) => {
  const baseURL = 'https://itunes.apple.com/';

  const { 'podjs.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL,
    timeout: 10000,
  });

  if (token) api.defaults.headers.common['Authorization'] = token;

  return api;
};

const api = getApi();

export default api;
