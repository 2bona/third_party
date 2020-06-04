/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import UserAPI from "../api/UserApi.js"
import router from "../router"

import { AXIOS_CONFIG } from "./../config.js"
const axios = require("axios")
import wrapper from 'axios-cache-plugin'

const http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
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
    areaList: [],
    item: [],
    favourites: [],
    userOrder: {},
    userOrderList: [],
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
    orderListPage: {},
    userOrderListLoading: false,
    snackbar: {
      status: 0,
      color: 'green',
      text: 'hello'
    },
    snackbar2: {
      color: 'primary',
      text: '',
      title: '',
      action: null,
      actionText: '',
      id: null,
      status: 0,
    },
  },
  actions: {
    status1({ commit, state, dispatch }, data) {
      commit("setSnackbar1Status", {
           status: data
         })
    },
    status2({ commit, state, dispatch }, data) {
      commit("setSnackbar2Status", {
           status: data
         })
    },
    snack2({ commit, state, dispatch }, data) {
      commit("setSnackbar2", {
           color: data.color,
           text: data.text,
           title: data.title,
           action: data.action,
           actionText: data.actionText,
           id: data.id,
           status: 1
         })
    },
    snack({ commit, state, dispatch }, data) {
      commit("setSnackbar", {
           color: data.color,
           text: data.text,
           status: 1
         })
    },
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
    async userOrderList({
        commit,
        state,
        dispatch
      }, data) {
        commit("setUserOrderListLoading", true)
        var url = ''
        var d = state.orderListPage
        if (d.nextPage) {
          if (d.lastPage === d.currentPage) {
            commit("setUserOrderListLoading", false)
            return
          } else {
            url = d.nextPage
        }
        }
        else if (d.nextPage === null) {
          commit("setUserOrderListLoading", false)
          return
        } else{
           url = "/userorder/all?page=1"
        }
        http({
              url: url,
              method: 'get'})
          .then(function (response) {
            var orderList = response.data.orders;
              var next = ''
            if (orderList.next_page_url !== null) {
            next = orderList.next_page_url.substring(38)
            } else {
              next = null
            }
            
            return dispatch("orderPage",
            {
              nextPage:next,
              lastPage: orderList.last_page,
              currentPage: orderList.current_page,
            })
            .then(()=>{
              dispatch("setUserOrderList", orderList.data)
              commit("setUserOrderListLoading", false)
            })


          }).catch(function (error) {
            console.log(error)
            commit("setUserOrderListLoading", false)
          })
      },
      orderPage({
        commit,
        state,
        dispatch
      }, data){
        return new Promise((resolve, reject) => {
        commit("setUserOrderListPage", data)
        resolve()
        })
      },
      setUserOrderList({
        commit,
        state,
        dispatch
      }, data){
        return new Promise((resolve, reject) => {
        commit("setUserOrderList", data)
        resolve()
        })
      },
      getUserOrder({
        commit,
        state,
        dispatch
      }, data) {
        
        let url = "/userorder/find?id=" + data.id
        axios.get(AXIOS_CONFIG.API_URL + url)
          .then(function (response) {
            var order = response.data.order;
            commit("setUserOrder", order)
          }).catch(function (error) {
            console.log(error)
          })
      },
      getUserFavourites({
        commit,
        state,
        dispatch
      }, data) {
        
        let url = "/load_favourites"
        axios.get(AXIOS_CONFIG.API_URL + url)
          .then(function (response) {
            var favourites = response.data.success.favourites.vendors;
            commit("setUserFavourites", favourites)
          }).catch(function (error) {
            console.log(error)
          })
      },
      userOrder({
        commit,
        state,
        dispatch
      }, data) {
        if (data.action === null) {
          dispatch("getUserOrder", {
            id: data.id
          })
        } else {
          let url = "/userorder/" + data.action + "?id=" + data.id
          axios.get(AXIOS_CONFIG.API_URL + url)
            .then(function (response) {
              console.log(response.data.message)
              dispatch("getUserOrder", {
                id: data.id
              })
            }).catch(function (error) {
              console.log(error)
            })
        }
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
    logout({ commit, state, dispatch }, data) {
        axios.get(AXIOS_CONFIG.API_URL + "/logout")
        .then(function(response) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          localStorage.removeItem("vendor")
          delete axios.defaults.headers.common["Authorization"]
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
    setSnackbar(state, snack) {
      state.snackbar = snack
      setTimeout(() => {
        state.snackbar.status = false
      }, 5000);
    },
    setSnackbar2(state, snack) {
      state.snackbar2 = snack
    },
    setSnackbar1Status(state, snack) {
      state.snackbar.status = snack.status
    },
    setSnackbar2Status(state, snack) {
      state.snackbar2.status = snack.status
    },
    setUser(state, user) {
      state.user = user
    },
    setItem(state, item) {
      state.item = item
    },
    setUserFavourites(state, item) {
      state.favourites = item
    },
    setUserOrder(state, userOrderList) {
      state.userOrder = userOrderList
    },
    setUserOrderList(state, userOrder) {
      if (userOrder === null) {
        state.userOrderList = []
      } else{
         userOrder.forEach(item => {
         state.userOrderList.push(item)
      })
      }
    
    },
    setUserOrderListPage(state, orderListPage){
      state.orderListPage = orderListPage
    },
    setUserOrderListLoading(state, orderListPage) {
      state.userOrderListLoading = orderListPage
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
    getUserFavourites(state) {
      return state.favourites
    },
    getUserOrder(state) {
        return state.userOrder
      },
    getUserOrderList(state) {
        return state.userOrderList
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
    getUserOrderListLoading(state) {
      return state.userOrderListLoading
    },
    getSnackbar(state) {
      return state.snackbar
    },
    getSnackbar2(state) {
      return state.snackbar2
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
