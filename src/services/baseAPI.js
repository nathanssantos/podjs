/* eslint-disable no-undef */
import Axios from "axios";

const baseAPI = Axios.create({
  baseURL: process.env.REACT_APP_PODCAST_API_URL,
  timeout: 30000,
  validateStatus: (status) => status !== 401,
});

baseAPI.defaults.headers.common["X-ListenAPI-Key"] =
  process.env.REACT_APP_PODCAST_API_KEY;

export default baseAPI;
