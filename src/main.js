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
// import "./stylus/main.styl";
// import NProgress from "nprogress";

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Accept'] = 'application/json';

// axios.defaults.headers.common['Authorization'] = 'Bearer' + apitoken;
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
// before a request is made start the nprogress
// axios.interceptors.request.use(config => {
//   NProgress.start()
//   return config
// })

// before a response is returned stop nprogress
// axios.interceptors.response.use(response => {
//   NProgress.done()
//   return response
// })
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

Vue.filter("name", function(text) {
  if (text.length >= 15) {
    return text.slice(0, 15) + "...";
  } else {
    return text;
  }
});
new Vue({
  vuetify,
  store,
  router,

  render: h => h(App)
}).$mount("#app");
