/* eslint-disable no-undef */
import Axios from "axios";

const baseAPI = Axios.create({
  timeout: 30000,
  validateStatus: (status) => status !== 401,
});

baseAPI.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default baseAPI;
