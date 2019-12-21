/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import UserAPI from "../api/UserApi.js"
import router from "../router"

import { AXIOS_CONFIG } from "./../config.js"
const axios = require("axios")
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"
axios.defaults.headers.post["Accept"] = "application/json"
axios.defaults.headers.post["Credentials"] = true
var token = localStorage.getItem("token")
if (token) {
  var isLoggesIn = true
  axios.defaults.headers.common["Authorization"] = "Bearer " + token
} else {
  isLoggesIn = false
}
export const user = {
  state: {
    user: JSON.parse(localStorage.getItem("user"))|| '',
    LoadStatus: 0,
    areaList: {},
    item: [],
    addresses: {},
    vendorList: [],
    userAddStatus: 0,
    userRegisteredStatus: 0,
    isLoggedIn: false,
    mapNav: false,
    vendorLoading: false,
    token: localStorage.getItem("token") || "",
    city: JSON.parse(localStorage.getItem("usercity")) || "",
    area: JSON.parse(localStorage.getItem("userarea")) || "",
    loginError: "",
    loginStatus: isLoggesIn,
    registerError: "",
    snackbar: {
      status: 0,
      color: 'green',
      text: 'hello'
    },
  },
  actions: {
    addUser({ commit, state, dispatch }, data) {
      commit("setUserRegisteredStatus", 1)
      axios
      .post(AXIOS_CONFIG.API_URL + "/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        c_password: data.c_password
      })
      .then(function(response) {
        commit("setUserRegisterError", [])
        commit("setUserRegisteredStatus", 2)
        commit("setSnackbar", {
          color: 'red',
          text: 'happy',
          status: 1
        })
        router.push("/auth/login")
      })
      .catch(function(error) {
        // eslint-disable-next-line no-console
        commit("setUserRegisteredStatus", 3)
        commit("setUserRegisterError", error.response.data.error)
      })
    },
    passcode({ commit, state, dispatch }, data) {
      localStorage.setItem("user", JSON.stringify(data))
      commit("setUser", data)
      router.push("/auth/passcode")
    },
    resetpasscode({ commit, state, dispatch }, data) {
      localStorage.setItem("user", JSON.stringify(data))
      commit("setUser", data)
      router.push("/auth/passcode")
    },
    setUser({ commit, state, dispatch }, data) {
      localStorage.setItem("user", JSON.stringify(data))
      commit("setUser", data)
    },
    setToken({ commit, state, dispatch }, data) {
      localStorage.setItem("token", data)
      commit("setToken", data)
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data
    },
    setUserArea({ commit, state, dispatch }, data) {
      localStorage.setItem("userarea", JSON.stringify(data.area))
      commit("setUserArea", data.area)
    },
    setAreaList({ commit, state, dispatch }, data) {
      commit("setUserAreaList", data.items)
    },
    setVendorList({
        commit,
        state,
        dispatch
      }, data) {
      commit("setVendorList", data.items)
    },
    setItem({
        commit,
        state,
        dispatch
      }, data) {
      commit("setItem", data)
    },
    mapNav({
        commit,
        state,
        dispatch
      }, data) {
      commit("setMapNav", data)
    },
    vendorLoading({
        commit,
        state,
        dispatch
      }, data) {
      commit("setVendorLoading", data)
    },
    setAddresses({
        commit,
        state,
        dispatch
      }, data) {
      commit("setUserAddresses", data)
    },
    setUserCity({ commit, state, dispatch }, data) {
      localStorage.setItem("usercity", JSON.stringify(data.city))
      commit("setUserCity", data.city)
    },
    snack({ commit, state, dispatch }, data) {
      commit("setSnackbar", {
           color: data.color,
           text: data.text,
           status: 1
         })
    },
    logout({ commit, state, dispatch }, data) {
           localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("usercity")
        localStorage.removeItem("userarea")
        delete axios.defaults.headers.common["Authorization"]
      axios.get(AXIOS_CONFIG.API_URL + "/logout").then(function(response) {
        router.push("/auth/login")
      }).catch(()=>{
        
        router.push("/auth/login")
      })
    }
  },
  mutations: {
    setLoadStatus(state, status) {
      state.LoadStatus = status
    },
    setUser(state, user) {
      state.user = user
    },
    setItem(state, item) {
      state.item = item
    },
    setVendorLoading(state, data) {
      state.vendorLoading = data
    },
    setVendorList(state, vendorList) {
      state.vendorList = vendorList
    },
    setUserCity(state, city) {
      state.city = city
    },
    setUserAddresses(state, addresses) {
      state.addresses = addresses
    },
    setUserArea(state, area) {
      state.area = area
    },
    setUserAreaList(state, area) {
      state.areaList = area
    },
    setUserLoginErrors(state, loginError) {
      state.loginError = loginError
    },
    setUserLoginStatus(state, loginStatus) {
      state.loginStatus = loginStatus
    },
    setUserRegisterError(state, registerError) {
      state.registerError = registerError
    },
    setSnackbar(state, snack) {
      state.snackbar = snack
      setTimeout(() => {
        state.snackbar.status = 0
      }, 4000)
    },
    setToken(state, token) {
      state.token = token
    },
    setMapNav(state, mapNav) {
      state.mapNav = mapNav
    },
    setUserAddedStatus(state, snack) {
      state.userAddStatus = snack
    },
    setUserRegisteredStatus(state, value) {
      state.userRegisteredStatus = value
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUserLoadStatus(state) {
      return state.LoadStatus
    },
    getUserLoginStatus(state) {
      return state.loginStatus
    },
    getUserAddresses(state) {
      return state.addresses
    },
    getVendorList(state) {
      return state.vendorList
    },
    getItem(state) {
      return state.item
    },
    getUserRegisteredStatus(state) {
      return state.userRegisteredStatus
    },
    getUserAddStatus(state) {
      return state.userAddStatus
    },
    getSnackbar(state) {
      return state.snackbar
    },
    getMapNav(state) {
      return state.mapNav
    },
    getVendorLoading(state) {
      return state.vendorLoading
    },
    getUser(state) {
      return state.user
    },
    getUserArea(state) {
      return state.area
    },
    getUserAreaList(state) {
      return state.areaList
    },
    getUserCity(state) {
      return state.city
    },
    getToken(state) {
      return state.token
    },
    getRegisterError(state) {
      return state.registerError
    },
    getLoginError(state) {
      return state.loginError
    }
  }
}
