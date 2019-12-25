/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import router from "../router";
const axios = require("axios");
import wrapper from 'axios-cache-plugin'

const http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
import {
  AXIOS_CONFIG
} from "./../config.js";
export const delivery_agent = {
  state: {
    deliveryOrderList: [],
    delivery_agent: JSON.parse(localStorage.getItem("delivery_agent")) || "",
    deliveryOrderFull: {},
    deliveryOrderListPage: {},
    deliveryOrderListLoading: false,
  },
  actions: {
     addDeliveryAgent({
       commit,
       state,
       dispatch
     }, data) {
           localStorage.setItem("delivery_agent", JSON.stringify(data))
           commit("setDeliveryAgent", data)
     },
    async deliveryOrderList({
           commit,
           state,
           dispatch
         }, data) {
           commit("setDeliveryOrderListLoading", true)
           var url = ''
           var d = state.deliveryOrderListPage
           if (d.nextPage) {
             if (d.lastPage === d.currentPage) {
               commit("setDeliveryOrderListLoading", false)
               return
             } else {
               url = d.nextPage
             }
           } else if (d.nextPage === null) {
             commit("setDeliveryOrderListLoading", false)
             return
           } else {
             url = "/order/alldelivery?page=1"
           }
           http({
               url: url,
               method: 'get'
             })
             .then(function (response) {
               var orderList = response.data.orders;
               var next = ''
               if (orderList.next_page_url !== null) {
                 next = orderList.next_page_url.substring(29)
               } else {
                 next = null
               }

               return dispatch("deliveryOrderPage", {
                   nextPage: next,
                   lastPage: orderList.last_page,
                   currentPage: orderList.current_page,
                 })
                 .then(() => {
                   dispatch("setDeliveryOrderList", orderList.data)
                   commit("setDeliveryOrderListLoading", false)
                 })


             }).catch(function (error) {
               console.log(error)
               commit("setDeliveryOrderListLoading", false)
             })
         },
             deliveryOrderPage({
               commit,
               state,
               dispatch
             }, data) {
               return new Promise((resolve, reject) => {
                 commit("setDeliveryOrderListPage", data)
                 resolve()
               })
             },
    getDeliveryOrder({
      commit,
      state,
      dispatch
    }, data) {
      commit("setDeliveryOrder", {})
      let url = "/order/find?id=" + data.id
      axios.get(AXIOS_CONFIG.API_URL + url)
        .then(function (response) {
          var order = response.data.order;
          commit("setDeliveryOrder", order)
        }).catch(function (error) {
          console.log(error)
        })
    },
        setDeliveryOrderList({
          commit,
          state,
          dispatch
        }, data) {
          return new Promise((resolve, reject) => {
            commit("setDeliveryOrderList", data)
            resolve()
          })
        },
deliveryOrder({
      commit,
      state,
      dispatch
    }, data) {
      if (data.action === null) {
         dispatch("getDeliveryOrder", {
           id: data.id
         })
      } else if(data.reason){
        let url = "/order/"+data.action+"?id=" + data.id+"&reason="+data.reason
   axios.get(AXIOS_CONFIG.API_URL + url)
     .then(function (response) {
       console.log(response.data.message)
       dispatch("getDeliveryOrder", {
         id: data.id
       })
     }).catch(function (error) {
       console.log(error)
     })
      } 
      
      else{
      let url = "/order/"+data.action+"?id=" + data.id
      axios.get(AXIOS_CONFIG.API_URL + url)
        .then(function (response) {
          console.log(response.data.message)
          dispatch("getDeliveryOrder", {
            id: data.id
          })
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
  loadDeliveryAgent({
      commit,
      state,
      dispatch
    }, data) {
      let url = "/delivery/load"
      axios.get(AXIOS_CONFIG.API_URL + url)
      .then(function (response) {
        let delivery_agent = response.data.delivery_agent[0];
        commit("setDeliveryAgent", delivery_agent)
        localStorage.setItem("delivery_agent", JSON.stringify(delivery_agent))
      }).catch(function (error) {
        console.log(error);
        })
    },
},
  mutations: {
    setDeliveryAgent(state, data) {
      state.delivery_agent = data
    },
    setDeliveryOrderList(state, DeliveryOrder) {
      if (DeliveryOrder === null) {
        state.deliveryOrderList = []
      } else {
        DeliveryOrder.forEach(item => {
          state.deliveryOrderList.push(item)
        })
      }
    },
    setDeliveryOrder(state, order) {
      state.deliveryOrderFull = order
    },
    setDeliveryAgentLoadStatus(state, status) {
      state.deliveryLoadStatus = status
    },
    setDeliveryOrderListPage(state, orderListPage) {
        state.deliveryOrderListPage = orderListPage
    },
    setDeliveryOrderListLoading(state, orderListPage) {
      state.deliveryOrderListLoading = orderListPage
    },
  },
  getters: {
    getDeliveryOrderList(state) {
      return state.deliveryOrderList
    },
    getDeliveryOrderFull(state) {
      return state.deliveryOrderFull
    },
    getDeliveryLoadStatus(state) {
      return state.deliveryOrderListLoading
    },
    getDeliveryAgent(state) {
      return state.delivery_agent
    },
  }
};