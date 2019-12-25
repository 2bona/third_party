/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import router from "../router";
import NProgress from "nprogress";
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
export const vendor = {
  state: {
    vendors: [],
    tags: [],
    replys: [],
    agents: [],
    orderList: [],
    vendor: JSON.parse(localStorage.getItem("vendor")) || "",
    mainOptions: JSON.parse(localStorage.getItem("mainOptions")) || "",
    mainOptionsList: JSON.parse(localStorage.getItem("mainOptionsList")) || "",
    menu: JSON.parse(localStorage.getItem("menu")) || '',
    list: JSON.parse(localStorage.getItem("list")) || '',
    items: JSON.parse(localStorage.getItem("items")) || '',
    options: JSON.parse(localStorage.getItem("options")) || '',
    orderFull:  {},
    vendorOrderListPage: {},
    vendorLoadStatus: false
  },
  actions: {
     addVendor({
       commit,
       state,
       dispatch
     }, data) {
           localStorage.setItem("vendor", data)
           commit("setVendor", data)
     },
    addCategory({
      commit,
      state,
      dispatch
    }, data) {
          // dispatch('loadCategories', {vendor_name: data.vendor_name});
    },
    
    loadPage({
      commit,
      state,
      dispatch
    }, data) {
      dispatch('loadOptions')
      dispatch('loadCategories')
    },
    loadCategories({
      commit,
      state,
      dispatch
    }, data) {
      let url = "/category/all"
      axios.get(AXIOS_CONFIG.API_URL + url)
        .then(function (response) {
          let menu = response.data.menu;
          localStorage.setItem("menu", JSON.stringify(menu))
          commit("setMenu", menu)
        }).catch(function (error) {
        })
    },
    loadItems({
      commit,
      state,
      dispatch
    }, data) {
      let url = "/item/all?id=" + data.id
      axios.get(AXIOS_CONFIG.API_URL + url)
        .then(function (response) {
          let items = response.data.items;
          localStorage.setItem("items", JSON.stringify(items))
          commit("setItems", items)
        }).catch(function (error) {
        })
    },
  async orderList({
      commit,
      state,
      dispatch
    }, data) {
      commit("setVendorOrderListLoading", true)
      var url = ''
      var d = state.vendorOrderListPage
      if (d.nextPage) {
        if (d.lastPage === d.currentPage) {
          commit("setVendorOrderListLoading", false)
          return
        } else {
          url = d.nextPage
        }
      } else if (d.nextPage === null) {
        commit("setVendorOrderListLoading", false)
        return
      } else {
        url = "/order/all?page=1"
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
          return dispatch("vendorOrderPage", {
              nextPage: next,
              lastPage: orderList.last_page,
              currentPage: orderList.current_page,
            })
            .then(() => {
              dispatch("setVendorOrderList", orderList.data)
              commit("setVendorOrderListLoading", false)
            })
        }).catch(function (error) {
          console.log(error)
          commit("setVendorOrderListLoading", false)
        })
    },
    vendorOrderPage({
      commit,
      state,
      dispatch
    }, data) {
      return new Promise((resolve, reject) => {
        commit("setVendorOrderListPage", data)
        resolve()
      })
      },
      setVendorOrderList({
        commit,
        state,
        dispatch
      }, data) {
        return new Promise((resolve, reject) => {
          commit("setOrderList", data)
          resolve()
        })
      },
    getOrder({
      commit,
      state,
      dispatch
    }, data) {
      commit("setOrder", {})
      let url = "/order/find?id=" + data.id
      axios.get(AXIOS_CONFIG.API_URL + url)
        .then(function (response) {
          var order = response.data.order;
          commit("setOrder", order)
        }).catch(function (error) {
          console.log(error)
        })
    },
    order({
      commit,
      state,
      dispatch
    }, data) {
      var url = ''
      if (data.action === null) {
         dispatch("getOrder", {
           id: data.id
         })
      }
      else{
         if(data.reason){
          url = "/order/"+data.action+"?id=" + data.id+"&reason="+data.reason
       } 
        else if (data.delivery_agent_id) {
          url = "/order/" + data.action + "?id=" + data.id + "&delivery_agent_id=" + data.delivery_agent_id
       } 
        else if (data.action) {
          url = "/order/" + data.action + "?id=" + data.id
       } 
      axios.get(AXIOS_CONFIG.API_URL + url)
         .then(function (response) {
           dispatch("getOrder", {
             id: data.id
           })
         }).catch(function (error) {
           console.log(error)
         })
      }
      
    },
    loadMainOptions({
      commit,
      state,
      dispatch
    }, data) {
      let url = "/main_option/all"
      axios.get(AXIOS_CONFIG.API_URL + url)
        .then(function (response) {
          let items = response.data;
          localStorage.setItem("mainOptions", JSON.stringify(items.main_options))
          localStorage.setItem("mainOptionsList", JSON.stringify(items.list))
          commit("setMainOptions", items.main_options)
          commit("setMainOptionslist", items.list)
        }).catch(function (error) {
          alert(error)
        })
    },
    saveItems({
      commit,
      state,
      dispatch
    }, data) {
          localStorage.setItem("items", JSON.stringify(data.data));
          commit("setItems", data.data);
    },
    setReplys({
      commit,
      state,
      dispatch
    }, data) {
          commit("setReplys", data.replys);
    },
    setAgents({
      commit,
      state,
      dispatch
    }, data) {
          commit("setAgents", data.agents);
    },
loadOptions({
      commit,
      state,
      dispatch
    }, data) {
      let url = "/options/all"
      axios.get(AXIOS_CONFIG.API_URL + url)
        .then(function (response) {
          let options = response.data.options;
          let list = response.data.list;
          localStorage.setItem("options", JSON.stringify(options))
          localStorage.setItem("lists", JSON.stringify(list))
          commit("setOptions", options)
          commit("setList", list)
        }).catch(function (error) {
          console.log(error)
        })
    },
  loadVendor({
      commit,
      state,
      dispatch
    }, data) {
      let url = "/vendor/load"
      axios.get(AXIOS_CONFIG.API_URL + url)
      .then(function (response) {
        let vendor = response.data.vendor[0];
        commit("setVendor", vendor)
        localStorage.setItem("vendor", JSON.stringify(vendor))
      }).catch(function (error) {
        console.log(error);
        })
    },
  loadTags({
      commit,
      state,
      dispatch
    }, data) {
      let url = "/vendor/tags"
      axios.get(AXIOS_CONFIG.API_URL + url)
      .then(function (response) {
        let tags = response.data.tags;
        commit("setTags", tags)
      }).catch(function (error) {
        console.log(error);
        })
    }
},
  mutations: {
    setVendor(state, data) {
      state.vendor = data
    },
      setOrderList(state, vendorOrder) {
        if (vendorOrder === null) {
          state.orderList = []
        } else {
          vendorOrder.forEach(item => {
            state.orderList.push(item)
          })
        }
      },
    setVendorOrderListPage(state, data) {
      state.vendorOrderListPage = data
    },
    setReplys(state, data) {
      state.replys = data
    },
    setAgents(state, data) {
      state.agents = data
    },
    setMenu(state, menu) {
      state.menu = menu
    },
    setOptions(state, options) {
      state.options = options
    },
    setOrder(state, order) {
      state.orderFull = order
    },
    setMainOptions(state, items) {
      state.mainOptions = items
    },
    setMainOptionslist(state, items) {
      state.mainOptionsList = items
    },
    setList(state, list) {
      state.list = list
    },
    setTags(state, tag) {
      state.tags = tag
    },
    setItems(state, items) {
      state.items = items
    },
    setVendorOrderListLoading(state, status) {
      state.vendorLoadStatus = status
    },
  },
  getters: {
    getMenu(state) {
      return state.menu
    },
    getReplys(state) {
      return state.replys
    },
    getAgents(state) {
      return state.agents
    },
    getOrderList(state) {
      return state.orderList
    },
    getTags(state) {
      return state.tags
    },
    getOptions(state) {
      return state.options
    },
    getOrderFull(state) {
      return state.orderFull
    },
    getMainOptions(state) {
      return state.mainOptions
    },
    getMainOptionsList(state) {
      return state.mainOptionsList
    },
    getList(state) {
      return state.list
    },
    getItems(state) {
      return state.items
    },
    getVendor(state) {
      return state.vendor
    },
    getVendorLoadStatus(state) {
      return state.vendorLoadStatus
    },


  }
};