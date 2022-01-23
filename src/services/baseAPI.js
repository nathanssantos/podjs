/* eslint-disable no-undef */
import Axios from "axios";
import adapter from "axios-jsonp";

const baseAPI = Axios.create({
  adapter,
  timeout: 30000,
  validateStatus: (status) => status !== 401,
});

baseAPI.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default baseAPI;
