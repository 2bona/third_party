/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import router from "../router";
const axios = require("axios");
import store from "../store.js";
import wrapper from "axios-cache-plugin";
var loc = localStorage.getItem("acceptedOrders");
if (!loc) {
  localStorage.setItem("acceptedOrders", []);
}
const http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true, // should headers be ignored in cache key, helpful for ignoring tracking headers
});
import { AXIOS_CONFIG } from "./../config.js";
export const delivery_agent = {
  state: {
    deliveryOrderList: [],
    delivery_agent: JSON.parse(localStorage.getItem("delivery_agent")) || {},
    deliveryOrderFull: {},
    deliveryOrderListPage: {},
    deliveryOrderListLoading: false,
    watchId: null,
    info: null,
    lat: "",
    lng: "",
    platform: JSON.parse(localStorage.getItem("platform")) || "",
  },
  actions: {
    addDeliveryAgent({ commit, state, dispatch }, data) {
      localStorage.setItem("delivery_agent", JSON.stringify(data));
      commit("setDeliveryAgent", data);
    },
    async deliveryOrderList({ commit, state, dispatch }, data) {
      commit("setDeliveryOrderListLoading", true);
      var url = "";
      var d = state.deliveryOrderListPage;
      if (d.nextPage) {
        if (d.lastPage === d.currentPage) {
          commit("setDeliveryOrderListLoading", false);
          return;
        } else {
          url = d.nextPage;
        }
      } else if (d.nextPage === null) {
        commit("setDeliveryOrderListLoading", false);
        return;
      } else {
        url = "/order/alldelivery?page=1";
      }
      http({
        url: url,
        method: "get",
      })
        .then(function(response) {
          var orderList = response.data.orders;
          var next = "";
          if (orderList.next_page_url !== null) {
            next = orderList.next_page_url.substring(38);
          } else {
            next = null;
          }

          return dispatch("deliveryOrderPage", {
            nextPage: next,
            lastPage: orderList.last_page,
            currentPage: orderList.current_page,
          }).then(() => {
            dispatch("setDeliveryOrderList", orderList.data);
            commit("setDeliveryOrderListLoading", false);
          });
        })
        .catch(function(error) {
          console.log(error);
          commit("setDeliveryOrderListLoading", false);
        });
    },
    setWatchId({ commit, state, dispatch }, data) {
      commit("setWatchId", data);
    },
    deliveryOrderPage({ commit, state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        commit("setDeliveryOrderListPage", data);
        resolve();
      });
    },
    getDeliveryOrder({ commit, state, dispatch }, data) {
      // commit("setDeliveryOrder", {})
      let url =
        "/order/delivery_find?id=" +
        data.id +
        "&delivery_agent_id=" +
        state.delivery_agent.id;
      axios
        .get(AXIOS_CONFIG.API_URL + url)
        .then(function(response) {
          var order = response.data.order;
          if (order) {
            commit("setDeliveryOrder", order);
            data.action === "delivered"
              ? ""
              : data.action === "transit"
              ? router.push("/ordermap")
              : router.push("/adminorder");
          } else {
            dispatch("deliveryOrderPage", {}).then(() => {
              dispatch("setDeliveryOrderList", null);
              dispatch("deliveryOrderList");
              dispatch("snack", {
                color: "red",
                text: "Sorry, Order has already been assigned",
              });
            });
          }
        })
        .catch(function(error) {
          alert("Invalid Request");
        });
    },
    removeAccepted({ commit, state, dispatch }, data) {
      var orders = JSON.parse(localStorage.getItem("acceptedOrders"));
      var fresh = orders.filter((el) => {
        return el.id != data.id;
      });
      if (!fresh.length) {
        // alert("unbinbing")
        Channel2.unbind("private-logistic."+state.logistic_id);
        navigator.geolocation.clearWatch(state.watchId);
      }
      var newFresh = JSON.stringify(fresh);
      localStorage.removeItem("acceptedOrders");
      localStorage.setItem("acceptedOrders", newFresh);
      return;
    },
    addAccepted({ commit, state, dispatch }, data) {
      let orders = localStorage.getItem("acceptedOrders");
      var fresh = "";
      var newOrder = "";
      if (!orders) {
        orders = [];
      } else {
        orders = JSON.parse(orders);
      }
      newOrder = {
        id: data.id,
        vendor: data.vendor,
        vendorAddress: data.vendorAddress,
        phone: data.phone,
        address: data.address,
        total: data.total,
        paid: data.paid,
      };
      orders.push(newOrder);
      fresh = JSON.stringify(orders);
      localStorage.removeItem("acceptedOrders");
      localStorage.setItem("acceptedOrders", fresh);
    },
    setInfo({ commit, state, dispatch }, data) {
      commit("setInfo", data);
    },
    setDeliveryOrderList({ commit, state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        commit("setDeliveryOrderList", data);
        resolve();
      });
    },
    async order2({ commit, state, dispatch }, data) {
      var url = "";
      if (data.action === null) {
        dispatch("getDeliveryOrder", {
          id: data.id,
        });
      } else {
        if (data.reason) {
          url =
            "/order/" +
            data.action +
            "?id=" +
            data.id +
            "&reason=" +
            data.reason +
            "&lng=" +
            store.getters.getLocation2.longitude +
            "&lat=" +
            store.getters.getLocation2.latitude;
        } else if (data.delivery_agent_id) {
          url =
            "/order/" +
            data.action +
            "?id=" +
            data.id +
            "&delivery_agent_id=" +
            data.delivery_agent_id;
        } else if (data.action) {
          url = "/order/" + data.action + "?id=" + data.id+
          "&lng=" +
          (store.getters.getLocation2.longitude) +
          "&lat=" +
          (store.getters.getLocation2.latitude);
        }
        axios
          .get(AXIOS_CONFIG.API_URL + url)
          .then(function(res) {
            if (data.action === "transit" || data.action === "delivered") {
              dispatch("getDeliveryOrder", {
                id: data.id,
                action: data.action,
              });
            } else {
              dispatch("getDeliveryOrder", {
                id: data.id,
              });
            }
          })
          .catch(function(error) {
            console.log(error.response);
            if (error.response.data === "error") {
              dispatch("snack", {
                color: "red",
                text: "Sorry, Order has already been assigned",
              });
              router.push("/");
            }
          });
      }
    },
    removeItem2({ commit, state, dispatch }, data) {
      console.log(data);
      var orderList = state.deliveryOrderList.filter((el) => {
        return el.id !== data;
      });
      state.deliveryOrderList = orderList;
    },
    addItem2({ commit, state, dispatch }, data) {
      console.log("getItem");
      const hasId = state.deliveryOrderList.some((el) => {
        el.id == data;
      });
      if (hasId) return;
      axios
        .get(AXIOS_CONFIG.API_URL + "/order/alldelivery_find?id=" + data)
        .then((res) => {
          var order = res.data.orders;
          console.log(order);
          state.deliveryOrderList.unshift(order);
        });
    },
    updateLocation({ commit, state, dispatch }, data) {
      commit("setLocation", data);
      if (data.load) {
        axios.post(AXIOS_CONFIG.API_URL + "/delivery/updateLocation", {
          lat: data.lat,
          long: data.lng,
        });
      }
    },
    deliveryOrder({ commit, state, dispatch }, data) {
      var url = "";
      if (data.action === null) {
        dispatch("getDeliveryOrder", {
          id: data.id,
        });
      } else {
        if (data.reason) {
          url =
            "/order/" +
            data.action +
            "?id=" +
            data.id +
            "&reason=" +
            data.reason;
        } else if (data.delivery_agent_id) {
          url =
            "/order/" +
            data.action +
            "?id=" +
            data.id +
            "&delivery_agent_id=" +
            data.delivery_agent_id;
        } else if (data.action) {
          url = "/order/" + data.action + "?id=" + data.id;
        }

        axios
          .get(AXIOS_CONFIG.API_URL + url)
          .then(function(res) {
            dispatch("getDeliveryOrder", {
              id: data.id,
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    setLogisticId({
      commit,
      state,
      dispatch
    }, data) {
      if (data !== null && window.Channel2 == null) {
       
        window.Channel2 = pusher2.subscribe('private-logistic.'+484);
        Channel2.bind('logistic_event.'+484, (event_data) => {
          if (!OrderSoundPlaying) {
            OrderSound.play();
          }
          store.dispatch('addItem', event_data.order)
          store.dispatch('getOrder', {
            id: event_data.order,
            action: 'clear'
          })
        });
        localStorage.setItem("logistic_id", data);
        commit("setLogisticId", data);
      }
    },
    loadDeliveryAgent({ commit, state, dispatch }, data) {
      let url = "/delivery/load";
      axios
        .get(AXIOS_CONFIG.API_URL + url)
        .then(function(response) {
          let delivery_agent = response.data.delivery_agent[0];
          commit("setDeliveryAgent", delivery_agent);
          localStorage.setItem(
            "delivery_agent",
            JSON.stringify(delivery_agent)
          );
          localStorage.setItem("logistic_id", (delivery_agent.logistic_id))
          if (delivery_agent.logistic_id > 0 ) {
            dispatch("setLogisticId", delivery_agent.logistic_id);
          }
        })
        .catch(function(error) {
          console.log(error);
          // router.push("/Regagent");
        });
    },
  },
  mutations: {
    setLogisticId(state, data) {
      state.logistic_id = data
    },
    setLocation(state, data) {
      state.lat = data.lat;
      state.lng = data.lng;
    },
    setInfo(state, data) {
      state.info = data;
    },
    setDeliveryAgent(state, data) {
      state.delivery_agent = data;
    },
    setDeliveryOrderList(state, DeliveryOrder) {
      if (DeliveryOrder === null) {
        state.deliveryOrderList = [];
      } else {
        state.deliveryOrderList = DeliveryOrder;
      }
    },
    setDeliveryOrder(state, order) {
      state.deliveryOrderFull = order;
    },
    setDeliveryAgentLoadStatus(state, status) {
      state.deliveryLoadStatus = status;
    },
    setWatchId(state, data) {
      state.watchId = data;
    },
    setDeliveryOrderListPage(state, orderListPage) {
      state.deliveryOrderListPage = orderListPage;
    },
    setDeliveryOrderListLoading(state, orderListPage) {
      state.deliveryOrderListLoading = orderListPage;
    },
  },
  getters: {
    getLocation(state) {
      return { lat: state.lat, lng: state.lng };
    },
    getWatchId(state) {
      return state.watchId;
    },
    getDeliveryOrderList(state) {
      return state.deliveryOrderList;
    },
    getDeliveryOrderFull(state) {
      return state.deliveryOrderFull;
    },
    getDeliveryLoadStatus(state) {
      return state.deliveryOrderListLoading;
    },
    getDeliveryAgent(state) {
      return state.delivery_agent;
    },
    getInfo(state) {
      return state.info;
    },
  },
};
