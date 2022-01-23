/* eslint-disable no-undef */
import Axios from "axios";

const baseAPI = Axios.create({
  baseURL: `https://cors.io/?${process.env.REACT_APP_PODCAST_API_URL}`,
  timeout: 30000,
  validateStatus: (status) => status !== 401,
});

baseAPI.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default baseAPI;
