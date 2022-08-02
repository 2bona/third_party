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
import { Plugins } from "@capacitor/core";
const {
  Toast,
  SplashScreen,
  PushNotifications,
  App,
  LocalNotifications,
  Device,
} = Plugins;
App.removeAllListeners();
SplashScreen.hide();

import Vue from "vue";
import Apps from "./App.vue";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";
import router from "./router";
import {Howl, Howler} from 'howler';
import VueMeta from "vue-meta";
import "./registerServiceWorker";
import Vuex from "vuex";
import store from "./store.js";
import axios from "axios";
import moment from "moment";
import VueCountdownTimer from "vuejs-countdown-timer";
import Cohere from "cohere-js";
Cohere.init("sqObFCvhZF8ro19ItzNDBgFU");
const deliveryAgent = store.getters.getDeliveryAgent;
if (deliveryAgent.id) {
  Cohere.identify(
    deliveryAgent.id ,// Required: can be any unique ID
    {
      displayName: 'Logistic_Agent_'+deliveryAgent.logistic_id, // Optional
      email: deliveryAgent.phone, // Optional
    }
  );
  
}
Vue.use(VueCountdownTimer);
const platform = JSON.parse(localStorage.getItem("platform"));

// LocalNotifications.schedule({
//   notifications: [
//     {
//       title: "Welcome back",
//       body: "hey welcome back to our app",
//       id: 1,
//       schedule: { at: new Date(Date.now() + 1000 * 5) },
//       sound: null,
//       attachments: null,
//       actionTypeId: "",
//       extra: null
//     }
//   ]
// });
LocalNotifications.addListener("localNotificationReceived", (lcm) => {
  console.log(lcm);
});

Device.getInfo().then((res) => {
  console.log(JSON.stringify(res));
  console.log(res.platform);
  if (!platform.platform) {
    console.log("getting platform..............");
    localStorage.setItem("platform", JSON.stringify(res));
  }
  platform = res
});
if (platform) {
  if (platform.platform !== "web") {
    PushNotifications.requestPermission().then((result) => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
        alert(
          "Push notification is disabled, you will not recieve any notifications."
        );
      }
    });

    // Set up push notification for vendor
    // and round it oup then do the same for delivery agent

    PushNotifications.addListener("registration", (fcm) => {
      console.log("Push registration success, token: " + fcm.value);
      var token = localStorage.getItem("fcm");
      var vendor = JSON.parse(localStorage.getItem("vendor"));
      if (token) {
        if (token != fcm.value) {
          localStorage.removeItem("fcm");
          localStorage.setItem("fcm", fcm.value);
          if (vendor.id) {
            axios
              .post("/setfcm", {
                token: fcm.value,
                type: "vendor",
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      } else {
        localStorage.setItem("fcm", fcm.value);
      }
    });

    PushNotifications.addListener("registrationError", (error) => {
      console.log("Error on registration: " + JSON.stringify(error));
    });

    PushNotifications.addListener("pushNotificationReceived", (res) => {
      console.log("Push received: " + JSON.stringify(res));
      // alert(res.title + " : " + res.body);
      var t = JSON.parse(res.data.payload);
      var action = null;
      var id = t.id;
      var actionText = "";
      if (t.id != null) {
        if (t.url === "/adminorder") {
          action = 1;
          actionText = "open order";
        } else if (t.url === "/vendor") {
          action = 2;
          actionText = "Proceed";
        }
      } else {
        id = null;
        action = null;
        actionText = null;
      }
      store.dispatch("snack2", {
        color: "primary",
        text: res.body,
        title: res.title,
        action: action,
        actionText: actionText,
        id: id,
        status: 1,
      });
      //id data title body
    });

    PushNotifications.addListener("pushNotificationActionPerformed", (res) => {
      console.log("Push action performed: " + JSON.stringify(res));
      store.getters.getBusy ? "" : store.dispatch("busy");

      var t = JSON.parse(res.notification.data.payload);

      if (res.actionId === "tap") {
        if (t.url === "/adminorder") {
          store.dispatch("order", {
            id: t.id,
            action: "read",
          });
        } else if (t.url === "/vendor") {
          router.push("/adminedit");
        } else if (t.url === "/home") {
          router.push("/");
        }
        store.dispatch("status2", false);
      }

      // actionId notification obj {id data
    });
  }
}
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
window.Pusher = require('pusher-js');

 window.pusher2 = new Pusher("d2e70c8ff384657760d1", {
  cluster: "eu",
  encrypted: true,
  authEndpoint: 'https://foodrepublic.herokuapp.com/api/broadcasting/auth',
  auth: {
    headers: {
        Authorization: 'Bearer ' + store.getters.getToken
    }
},
});
window.OrderSoundPlaying = false
  window.OrderSound = new Howl({
    src: 'https://res.cloudinary.com/dnqw7x4bp/video/upload/v1608357177/Air_Plane_Ding-SoundBible.com-496729130.mp3',
    loop: true,
    onplay: function() {
      OrderSoundPlaying = true
    },
    onstop: function() {
      OrderSoundPlaying = false
    }
  });
  const logistic_id = store.getters.getLogisticId
  if (logistic_id > 0) {
    window.Channel2 = pusher2.subscribe('private-logistic.'+logistic_id);
    Channel2.bind('logistic_event.'+logistic_id, (data) => {
if (!OrderSoundPlaying) {
  OrderSound.play();
}
    store.dispatch('addItem', data.order)
    store.dispatch('getOrder', {
      id: data.order,
      action: 'clear' 
  })
});
  }
new Vue({
  vuetify,
  store,
  router,

  render: (h) => h(Apps),
}).$mount("#app");
