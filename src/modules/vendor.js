/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import router from "../router";
import NProgress from "nprogress";
const axios = require("axios");

import {
  AXIOS_CONFIG
} from "./../config.js";
export const vendor = {
  state: {
    vendors: [],
    vendor: JSON.parse(localStorage.getItem("vendor")) || "",
    menu: JSON.parse(localStorage.getItem("menu")) || '',
    list: JSON.parse(localStorage.getItem("list")) || '',
    items: JSON.parse(localStorage.getItem("items")) || '',
    options: JSON.parse(localStorage.getItem("options")) || '',
    vendorLoadStatus: 0
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
      dispatch('loadItems')
    },
    loadCategories({
      commit,
      state,
      dispatch
    }, data) {
      let url = "/category/all?vendor_name="+data.name
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
      let url = "/item/all"
      axios.get(AXIOS_CONFIG.API_URL + url)
        .then(function (response) {
          let items = response.data.items.data;
          localStorage.setItem("items", JSON.stringify(items))
          commit("setItems", items)
        }).catch(function (error) {
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
      let url = "/vendor/find?user_id="+data.vendor
      axios.get(AXIOS_CONFIG.API_URL + url)
      .then(function (response) {
        let vendor = response.data.vendor;
        let v_name = response.data.vendor.name;
        localStorage.setItem("vendor", JSON.stringify(vendor))
        commit("setVendor", vendor)
        dispatch('loadCategories', {
          vendor_name: v_name
        });
      }).catch(function (error) {
        console.log(error);
        })
    }
},
  mutations: {
    setVendor(state, data) {
      state.vendor = data
    },
    setMenu(state, menu) {
      state.menu = menu
    },
    setOptions(state, options) {
      state.options = options
    },
    setList(state, list) {
      state.list = list
    },
    setItems(state, items) {
      state.items = items
    },
    setVendorLoadStatus(state, status) {
      state.VendorLoadStatus = status
    },
  },
  getters: {
    getMenu(state) {
      return state.menu
    },
    getOptions(state) {
      return state.options
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