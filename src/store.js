import Vue from "vue";
import Vuex from "vuex";
import { vendor } from "./modules/vendor.js";
import { user } from "./modules/user.js";
import { order } from "./modules/order.js";
import { delivery_agent } from "./modules/delivery.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    vendor,
    user,
    order,
    delivery_agent
  }
});
