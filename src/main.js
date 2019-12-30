/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";
import router from "./router";
import VueMeta from "vue-meta";
import "./registerServiceWorker";
import Vuex from "vuex";
import store from "./store.js";
import axios from "axios";
import moment from "moment";

document.cookie = 'cross-site-cookie=image; SameSite=None; Secure';

axios.defaults.baseURL = "https://foodrepublic.herokuapp.com/api";
    axios.interceptors.response.use(function (response) {
      // Do something with response data
      return response;
    }, function (error) {
      if (error === "Error: Network Error") {
        router.push('/auth/login')
        
      } else{
            switch (error.response.status) {
        case 401:
          router.push('/auth/login') //we will redirect user into 503 page 
          break
        case 500:
          router.push('/usercity') //we will redirect user into 503 page 
          break
        default:
          break
      }
      }
  
      // Do something with response error
      return Promise.reject(error);
    });
Vue.use(axios);

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(router);
Vue.use(VueMeta, {
  // keyName: "metaInfo",
  // attribute: "data-vue-meta",
  // ssrAttribute: "data-vue-meta-server-rendered",
  // tagIDKeyName: "vmid",
  // refreshOnceOnNavigation: true
});
Vue.filter("myDate", function(created) {
  return moment(created).format("MMM Do YYYY");
});
Vue.filter("nowDate", function(created) {
  return moment(created)
    .startOf("seconds")
    .fromNow();
});
Vue.filter("name", function(text) {
  if (text.length >= 10) {
    return text.slice(0, 10);
  } else {
    return text;
  }
});
Vue.filter("price", function(value) {
  if (value != null) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0;
  }
});
Vue.filter("distance", function(value) {
  if (value != null) {
    return (value / 1000).toFixed(1) + "km";
  } else {
    return 0;
  }
});
Vue.filter("duration", function(value) {
  if (value != null && val != 0) {
    var val = Math.floor((value % 3600) / 60);

    if ((val <= 5) && (val > 0 )) {
      return "15mins";
    } else if (val <= 10 && (val > 5)) {
      return "20mins";
    } else if (val <= 15 && (val > 10)) {
      return "30mins";
    } else if (val <= 20 && (val > 15)) {
      return "40mins";
    } else if (val <= 30 && (val > 20)) {
      return "45mins";
    } else if (val > 30) {
      return "55mins";
    } else {
      return "0";
    }
    // return val > 0 ? val + (val == 1 ? "min" : "mins") : "";
  } else {
    return "0";
  }
});
new Vue({
  vuetify,
  store,
  router,

  render: h => h(App)
}).$mount("#app");
