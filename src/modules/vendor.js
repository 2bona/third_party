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
    tags: [],
    vendor: JSON.parse(localStorage.getItem("vendor")) || "",
    mainOptions: JSON.parse(localStorage.getItem("mainOptions")) || "",
    mainOptionsList: JSON.parse(localStorage.getItem("mainOptionsList")) || "",
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
    setMenu(state, menu) {
      state.menu = menu
    },
    setOptions(state, options) {
      state.options = options
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
    setVendorLoadStatus(state, status) {
      state.VendorLoadStatus = status
    },
  },
  getters: {
    getMenu(state) {
      return state.menu
    },
    getTags(state) {
      return state.tags
    },
    getOptions(state) {
      return state.options
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