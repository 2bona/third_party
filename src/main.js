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

// import "./stylus/main.styl";
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Accept'] = 'application/json';

// axios.defaults.headers.common['Authorization'] = 'Bearer' + apitoken;
axios.defaults.baseURL = "http://192.168.0.100:8000/api";
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
  if (text.length >= 15) {
    return text.slice(0, 15) + "...";
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

    if (val <= 5) {
      return "15mins";
    } else if (val <= 10) {
      return "20mins";
    } else if (val <= 15) {
      return "30mins";
    } else if (val <= 20) {
      return "40mins";
    } else if (val <= 30) {
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
