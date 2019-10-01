import { AXIOS_CONFIG } from "./../config.js";
const axios = require("axios");

export default {
  /*
         GET     /api/v1/cafes
     */
  getVendors: function() {
    return axios.get(AXIOS_CONFIG.API_URL + "/vendors");
  },
  getVendor: function(id) {
    return axios.get(AXIOS_CONFIG.API_URL + "/vendor/find?id=" + id);
  }
};
