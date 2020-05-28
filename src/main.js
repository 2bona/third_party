/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
export const loadedGoogleMapsAPI = new Promise((resolve, reject) => {
  window["GoogleMapsInit"] = resolve;

  let GMap = document.createElement("script");

  GMap.setAttribute(
    "src",
    `https://maps.googleapis.com/maps/api/js?key=AIzaSyA1Uoi_ddjhFR5HNAgofZNat9eQAsUFtg0&callback=GoogleMapsInit&libraries=places`
  );
  document.body.appendChild(GMap);
});
import { Plugins, AppUrlOpen } from "@capacitor/core";
const { Toast } = Plugins;
const bckBtn = false;
Plugins.App.addListener("backButton", function() {
  if (bckBtn === false) {
    Toast.show({
      text: "Press back again to exit"
    });
    bckBtn = true;
    setTimeout(() => {
      bckBtn = false;
    }, 5000);
  } else {
    navigator.app.exitApp();
  }
});
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
document.cookie = "cross-site-cookie=image; SameSite=None; Secure";

axios.defaults.baseURL = "https://foodrepublic.herokuapp.com/api";
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    if (error === "Error: Network Error") {
      localStorage.removeItem("token");
      router.push("/auth");
    } else {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            localStorage.removeItem("token");
            router.push("/auth"); //we will redirect user into 503 page
            break;
          default:
            break;
        }
      }
    }

    // Do something with response error
    return Promise.reject(error);
  }
);
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
  return moment(created).format("lll");
});
Vue.filter("nowDate", function(created) {
  return moment(created)
    .startOf("seconds")
    .fromNow();
});
Vue.filter("trackDate", function(created) {
  if (created) {
    return moment(created).format("LT");
  } else {
    return null;
  }
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

    if (val <= 5 && val > 0) {
      return "15mins";
    } else if (val <= 10 && val > 5) {
      return "25mins";
    } else if (val <= 15 && val > 10) {
      return "35mins";
    } else if (val <= 20 && val > 15) {
      return "45mins";
    } else if (val <= 30 && val > 20) {
      return "50mins";
    } else if (val > 30) {
      return "55mins";
    } else {
      return "10mins";
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
