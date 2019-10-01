import { AXIOS_CONFIG } from "./../config.js";
const axios = require("axios");
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Credentials"] = true;

// axios.defaults.headers.common['Authorization'] = 'Bearer' + apitoken;
// axios.defaults.baseURL = "http://127.0.0.1:8000/api";
export default {
  /*
           GET     /api/v1/cafes
    */
  userDetails: function() {
    return axios.get(AXIOS_CONFIG.API_URL + "/details");
  }
};
